import { Typography,Alert } from "@mui/material";


const Proximante = ({title}) => {
  return (
    <>
      <Alert severity="info">
        <Typography variant="overline">Próximamente  {title && title} </Typography>
      </Alert>
    </>
  );
};

export default Proximante;
