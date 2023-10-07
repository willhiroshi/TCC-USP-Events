import React from 'react';
import {
  Checkbox,
  FormControlLabel,
  Button,
  Popover,
  DialogContent,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import * as styles from './styles';

interface Type {
  value: string;
  label: string;
}

interface Types {
  [key: string]: boolean;
}

interface TypeFilterProps {
  className?: string;
}

const typeOptions: Type[] = [
  {
    value: 'culture',
    label: 'Cultura'
  },
  {
    value: 'sport',
    label: 'Esporte'
  }
];

const TypesFilter = ({ className }: TypeFilterProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [filter, setFilter] = React.useState('');
  const [types, setTypes] = React.useState<Types>(
    typeOptions.reduce((acc, type) => ({ ...acc, [type.value]: false }), {})
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypes({ ...types, [event.target.name]: event.target.checked });
  };

  const selectedFiltersCount = React.useMemo(() => {
    return Object.values(types).filter(Boolean).length;
  }, [types]);

  const filteredTypes = React.useMemo(() => {
    return typeOptions.filter((type) => type.label.toLowerCase().includes(filter.toLowerCase()));
  }, [filter, typeOptions]);

  return (
    <div className={className}>
      <Button
        variant="text"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        startIcon={<FilterListIcon />}
        className={styles.filterButton}
      >
        {`Tipos${selectedFiltersCount > 0 ? ` (${selectedFiltersCount})` : ''}`}
      </Button>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <DialogContent className={styles.checkboxContainer}>
          <TextField
            className={styles.filterInput}
            label="Filtro"
            value={filter}
            focused
            onChange={(event) => setFilter(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: filter && (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setFilter('')}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {filteredTypes.length > 0 ? (
            filteredTypes.map((type) => (
              <FormControlLabel
                key={type.value}
                control={
                  <Checkbox checked={types[type.value]} onChange={handleChange} name={type.value} />
                }
                label={type.label}
              />
            ))
          ) : (
            <p className={styles.noTypesText}>Sem tipos...</p>
          )}
        </DialogContent>
      </Popover>
    </div>
  );
};

export default TypesFilter;
