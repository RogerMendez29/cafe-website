import React, { useRef, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../css/modal.css";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";

export default function ItemModalContainer({
  open,
  setOpen,
  setItemBeingAdded,
  itemBeingAdded,
}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (itemBeingAdded) {
      console.log(itemBeingAdded["imageURL"]);
    }
  });

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box>
            <div id="modal-container">
              <img
                src={itemBeingAdded ? itemBeingAdded["imageURL"] : null}
              ></img>
              <h1>Title</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro
                culpa odit doloremque nesciunt debitis natus exercitationem
                perferendis harum distinctio quis?
              </p>
              <div className="group flex items-center gap-2 ml-auto cursor-pointer">
                <motion.div whileTap={{ scale: 0.75 }}>
                  <BiMinus className="text-gray-50 " />
                </motion.div>

                <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
                  {1}
                </p>

                <motion.div whileTap={{ scale: 0.75 }}>
                  <BiPlus className="text-gray-50 " />
                </motion.div>
              </div>
              <Button>Add to Order</Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
