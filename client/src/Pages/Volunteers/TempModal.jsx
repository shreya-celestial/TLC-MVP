import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useState } from 'react';
import { inviteVolunteer } from '../../apis/volunteers';
import { useMutation } from '@tanstack/react-query';

const TempModal = () => {
  const [roleDropdown, setRoleDropdown] = useState('volunteer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: inviteVolunteer,
    onSuccess: (data) => {
      alert(data.message);
    },
    onError: (error) => {
      alert(error.info.message);
    },
  });

  const inviteVolunteerHandler = function (e) {
    e.preventDefault();
    mutate({
      isAdmin: roleDropdown === 'admin' ? 'true' : 'false',
      name,
      email,
    });
  };

  return (
    <Box>
      <form onSubmit={inviteVolunteerHandler}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormControl variant="outlined">
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            label="Role"
            variant="outlined"
            value={roleDropdown}
            onChange={(e) => {
              setRoleDropdown(e.target.value);
            }}
            size="small"
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="volunteer">Volunteer</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default TempModal;
