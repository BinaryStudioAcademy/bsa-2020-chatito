import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import styles from './styles.module.sass';
import { IUser } from 'common/models/user/IUser';
import MultiSelect from 'react-multi-select-component';
import { IAppState } from 'common/models/store';
import { connect } from 'react-redux';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { getWorkspaceUsers } from 'services/workspaceService';

interface IProps {
  createDirect: IBindingCallback1<any>;
  workspace: IWorkspace;
}

interface IOption {
  value: any;
  label: string;
}

const CreateDirect = ({ createDirect, workspace }: IProps) => {
  const [DirectUsers, setDirectUsers] = useState([]);
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    getWorkspaceUsers(workspace.id).then(usersArr => setUsers(usersArr));
  }, []);
  const mapOptionsToUsers = (options: IOption[]) => users
    .filter(user => options.map(({ value }) => value).indexOf(user.id) !== -1);

  const mapUsersToOptions = (_users: IUser[]) => _users.map(({ id, displayName }) => (
    { label: displayName, value: id }
  ));

  const options = mapUsersToOptions(users);

  const isSelectEmpty = () => !DirectUsers.length;

  const handleSubmit = () => {
    const directUsers = mapOptionsToUsers(DirectUsers);
    createDirect({
      name: `${DirectUsers.map(({ label }) => label).join(', ')}`,
      users: directUsers,
      isPrivate: (DirectUsers.length <= 2)
    });
  };

  const title = 'Create a Direct';

  const formHeader = (
    <h4 className={styles.header}>{title}</h4>
  );

  const addMembers = (
    <Form.Group>
      <MultiSelect
        options={options}
        value={DirectUsers}
        onChange={setDirectUsers}
        labelledBy="Select"
      />
    </Form.Group>
  );

  const formBody = (
    <div className={styles.formBody}>
      <p className={styles.formDescription}>
        Directs are where your can communicate with other people.
      </p>
      <Form>
        {addMembers}
      </Form>
    </div>
  );

  const formFooter = (
    <div className={styles.footer}>
      <Button
        disabled={isSelectEmpty()}
        variant="primary"
        onClick={handleSubmit}
      >
        Create
      </Button>
    </div>
  );

  return (
    <>
      {formHeader}
      {formBody}
      {formFooter}
    </>
  );
};

const mapStateToProps = (state: IAppState) => {
  const {
    workspace: { workspace }
  } = state;

  return {
    workspace
  };
};

export default connect(mapStateToProps)(CreateDirect);
