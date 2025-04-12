import { Check, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editedTask, setEditedTask] = useState<{ id: number, name: string } | null>(null);

  const handleFetchTasks = async () => {
    try {
      const fetchedTasks = await api.get('/tasks');
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      await handleFetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleSave = async (task: Partial<Task>) => {
    try {
      if (task.id) {
        await api.patch(`/tasks/${task.id}`, { name: task.name });
      } else {
        await api.post('/tasks', { name: task.name });
      }
      await handleFetchTasks();
      setEditedTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  useEffect(() => {
    handleFetchTasks();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2" sx={{ color: 'blue' }}>
          HDM Todo List
        </Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task) => (
          <Box
            key={task.id}
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
            gap={2}
            width="100%"
          >
            <TextField
              size="small"
              fullWidth
              sx={{
                maxWidth: 350,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'blue',
                  },
                  '&:hover fieldset': {
                    borderColor: 'blue',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'blue',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'gray',
                  opacity: 0.7,
                },
              }}
              placeholder="Entrer votre tâche"
              value={editedTask?.id === task.id ? editedTask.name : task.name}
              onChange={(e) => setEditedTask({ id: task.id, name: e.target.value })}
            />

            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="body2">Enregistrer</Typography>
              <IconButton
                color="success"
                onClick={() => editedTask && handleSave({ id: task.id, name: editedTask.name })}
                disabled={!editedTask || editedTask.name === task.name}
              >
                <Check />
              </IconButton>
            </Box>

            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="body2">Supprimer</Typography>
              <IconButton color="error" onClick={() => handleDelete(task.id)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <Button
            variant="contained"
            sx={{
              bgcolor: 'blue',
              color: 'white',
              '&:hover': {
                bgcolor: 'darkblue',
              },
            }}
            onClick={() => handleSave({ name: '' })}
          >
            AJOUTER UNE TÂCHE
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TodoPage;
