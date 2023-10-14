import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import styles from './styles';
import useHomeStore from '../../../../store/homeStore';

interface Type {
  value: string;
  label: string;
}

interface Types {
  [key: string]: boolean;
}

interface TypeFilterProps {
  style?: React.CSSProperties;
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

const TypesFilter = ({ style }: TypeFilterProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [filter, setFilter] = React.useState('');
  const [tempTypes, setTempTypes] = React.useState<Types>({});

  const storedTypes = localStorage.getItem('selectedTypes');
  const initialTypes = storedTypes
    ? JSON.parse(storedTypes)
    : typeOptions.reduce((acc, type) => ({ ...acc, [type.value]: false }), {});
  const [types, setTypes] = React.useState<Types>(initialTypes);

  const setTypeFilter = useHomeStore((state) => state.setTypeFilter);

  React.useEffect(() => {
    setTempTypes(types);
  }, [types]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempTypes({ ...tempTypes, [event.target.name]: event.target.checked });
  };

  const handleApply = () => {
    setTypes(tempTypes);
    setAnchorEl(null);

    const selectedTypes = Object.entries(tempTypes)
      .filter(([, value]) => value)
      .map(([key]) => key);

    const selectedTypesString = selectedTypes.join(',');
    setTypeFilter(selectedTypesString);

    localStorage.setItem('selectedTypes', JSON.stringify(tempTypes));
  };

  const handleClear = () => {
    setTempTypes(typeOptions.reduce((acc, type) => ({ ...acc, [type.value]: false }), {}));
  };

  const selectedFiltersCount = React.useMemo(() => {
    return Object.values(types).filter(Boolean).length;
  }, [types]);

  const filteredTypes = React.useMemo(() => {
    return typeOptions.filter((type) => type.label.toLowerCase().includes(filter.toLowerCase()));
  }, [filter, typeOptions]);

  return (
    <div style={style}>
      <Button
        sx={styles.filterButton}
        variant="text"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        startIcon={<FilterListIcon />}
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
        <DialogContent sx={styles.checkboxContainer}>
          <TextField
            sx={styles.filterInput}
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
                  <Checkbox
                    checked={tempTypes[type.value]}
                    onChange={handleChange}
                    name={type.value}
                  />
                }
                label={type.label}
              />
            ))
          ) : (
            <p style={styles.noTypesText}>Sem tipos...</p>
          )}
          <Divider />

          <div style={styles.finalButtons}>
            <Button variant="outlined" onClick={handleClear}>
              Limpar
            </Button>
            <Button variant="contained" onClick={handleApply}>
              Aplicar
            </Button>
          </div>
        </DialogContent>
      </Popover>
    </div>
  );
};

export default TypesFilter;
