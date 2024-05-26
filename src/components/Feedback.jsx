import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Feedback = ({ feedbacks }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Feedback Summary
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Conversation</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbacks.map((feedback, index) => (
              <TableRow key={index}>
                <TableCell>{`Conversation ${index + 1}`}</TableCell>
                <TableCell>{feedback.rating}</TableCell>
                <TableCell>{feedback.comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

Feedback.propTypes = {
  feedbacks: PropTypes.arrayOf(
    PropTypes.shape({
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default Feedback;
