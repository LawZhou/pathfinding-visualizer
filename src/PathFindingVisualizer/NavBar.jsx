import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { Speed, PlayArrow, Pause, Replay} from "@mui/icons-material";

function Navbar({handlePlayButton, handlePauseButton, handleResetButton, generateMaze}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [speed, setSpeed] = useState("Fast");
  const [isRunning, setIsRunning] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    handleClose();
  };

  const handlePlayButtonClick = () => {
    handlePlayButton(speed)
    setIsRunning(true);
  };

  const handlePauseButtonClick = () => {
    handlePauseButton()
    setIsRunning(false);
  };

  const handleResetButtonClick = () => {
    handleResetButton()
    setIsRunning(false);
    // add code to reset the pathfinding visualization
  };

  return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Pathfinding Visualizer
          </Typography>
          <Button color="inherit" onClick={handleClick}>
            Speed <Speed sx={{ ml: 1 }} />
          </Button>
          <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
          >
            <MenuItem onClick={() => handleSpeedChange("Slow")}>
              <ListItemIcon>
                <Speed />
              </ListItemIcon>
              <ListItemText primary="Slow" />
            </MenuItem>
            <MenuItem onClick={() => handleSpeedChange("Medium")}>
              <ListItemIcon>
                <Speed />
              </ListItemIcon>
              <ListItemText primary="Medium" />
            </MenuItem>
            <MenuItem onClick={() => handleSpeedChange("Fast")}>
              <ListItemIcon>
                <Speed />
              </ListItemIcon>
              <ListItemText primary="Fast" />
            </MenuItem>
          </Menu>
          {isRunning ? (
              <IconButton color="inherit" onClick={handlePauseButtonClick}>
                <Pause />
              </IconButton>
          ) : (
              <IconButton color="inherit" onClick={handlePlayButtonClick}>
                <PlayArrow />
              </IconButton>
          )}
          <IconButton color="inherit" onClick={handleResetButtonClick}>
            <Replay />
          </IconButton>
          <Button color="inherit" onClick={generateMaze}>
            Generate Maze
          </Button>
        </Toolbar>
      </AppBar>
  );
}

export default Navbar;