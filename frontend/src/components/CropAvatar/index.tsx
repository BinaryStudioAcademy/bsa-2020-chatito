import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';
import styles from './styles.module.sass';
import { Button, Spinner } from 'react-bootstrap';
import LoaderWrapper from 'components/LoaderWrapper';
import { uploadOnAWS, signS3Avatar, deleteAWSObject } from 'services/awsService';
import { toastr } from 'react-redux-toastr';
import { IBindingAction } from 'common/models/callback/IBindingActions';
import { ICropData } from 'common/models/cropAvatar/ICropData';

interface IProps {
  src: string;
  avatarLoading: boolean;
  clearAvatarData: IBindingAction;
  setImageUrl: (fileName: string) => void;
  handleClose: IBindingAction;
  imageUrl: string;
  updateAvatar: (imageUrl: string | null) => void;
}

export const CropAvatar: React.FC<IProps> = ({ src, avatarLoading, clearAvatarData,
  setImageUrl, handleClose, imageUrl, updateAvatar }) => {
  const [crop, setCrop] = useState<ReactCrop.Crop>({
    unit: '%',
    height: 100,
    aspect: 1
  });
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [croppedAvatarLoading, setCroppedAvatarLoading] = useState(false);

  const onCropChange = (newCrop: ReactCrop.Crop) => {
    setCrop(newCrop);
  };

  const onImageLoaded = (img: HTMLImageElement) => {
    setImage(img);
  };

  const getCroppedImg = (img: HTMLImageElement, cropData: ICropData) => {
    const canvas = document.createElement('canvas');
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    canvas.width = cropData.width;
    canvas.height = cropData.height;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.drawImage(
      img,
      cropData.x * scaleX,
      cropData.y * scaleY,
      cropData.width * scaleX,
      cropData.height * scaleY,
      0,
      0,
      cropData.width,
      cropData.height
    );

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        resolve(blob);
      }, 'image/jpeg');
    });
  };

  const onSave = async () => {
    try {
      setCroppedAvatarLoading(true);
      const croppedImage = await getCroppedImg(image as HTMLImageElement, crop as ICropData);
      const { signedRequest, fileName, link } = await signS3Avatar();
      await uploadOnAWS(signedRequest, croppedImage, fileName, 'jpeg');
      if (imageUrl) await deleteAWSObject(imageUrl);
      await updateAvatar(`/avatars/${fileName}`);
      setImageUrl(link);
      clearAvatarData();
    } catch (erorr) {
      toastr.error('Error', erorr.message);
      setCroppedAvatarLoading(false);
    }
  };

  return (
    <div className={styles.cropAvatar}>
      <header className={styles.header}>
        {avatarLoading ? 'Uploading your photo...' : 'Crop your photo'}
      </header>
      <LoaderWrapper loading={avatarLoading}>
        <div className={styles.imgWrp}>
          <ReactCrop
            src={src}
            onChange={onCropChange}
            crop={crop}
            keepSelection
            circularCrop
            minHeight={100}
            onImageLoaded={onImageLoaded}
            imageStyle={{ maxWidth: '460px', maxHeight: '460px' }}
          />
        </div>
      </LoaderWrapper>
      <div className={styles.btnWrp}>
        <Button className={styles.cancelBtn} variant="outline-secondary" onClick={handleClose}>Cancel</Button>
        {!avatarLoading && (
          <Button
            className={styles.saveBtn}
            onClick={onSave}
            disabled={!image || croppedAvatarLoading}
          >
            <span>Save</span>
            {croppedAvatarLoading && <Spinner animation="border" role="status" size="sm" className={styles.spinner} />}
          </Button>
        )}
      </div>
    </div>
  );
};
