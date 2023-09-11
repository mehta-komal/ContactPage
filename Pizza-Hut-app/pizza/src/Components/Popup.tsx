import React, { FC } from "react";
import { Dialog, DialogContent, Typography, CardMedia } from "@mui/material";

interface Variety {
  name: string;
  description: string;
  origin: string;
  strength: string;
  discount?: number;
  price: number;
  image: string;
}

interface PopupProps {
  variety: Variety | null;
  onClose: () => void;
}

const Popup: FC<PopupProps> = ({ variety, onClose }) => {
  const calculateDiscountedPrice = () => {
    if (variety && variety.discount) {
      const discountPercentage = variety.discount;
      const discount = (variety.price * discountPercentage) / 100;
      return (variety.price - discount).toFixed(2);
    }
    return variety?.price.toFixed(2);
  };

  return (
    <Dialog
      open={!!variety}
      onClose={onClose}
      maxWidth="md"
      classes={{ paper: "popup-paper" }}
    >
      <CardMedia
        component="img"
        image={variety?.image}
        alt={variety?.name}
        className="popup-image"
      />
      <DialogContent className="popup-box">
        <Typography variant="h6" className="popup-heading">
          {variety?.name}
        </Typography>
        <Typography variant="body2" className="popup-text">
          {variety?.description}
        </Typography>
        <Typography variant="body2" className="popup-text">
          <span>Origin:</span> {variety?.origin}
        </Typography>
        <Typography variant="body2" className="popup-text">
          <span>Strength:</span> {variety?.strength}
        </Typography>
        {variety && variety.discount ? (
          <>
            <Typography variant="body2" className="popup-text-p">
              Price:{" "}
              <span style={{ fontSize: "20px", color: "red" }}>
                -{variety.discount}%{" "}
              </span>
              ₹{calculateDiscountedPrice()}
            </Typography>
            <Typography variant="body2" className="popup-text-p">
              M.R.P :{" "}
              <span style={{ textDecoration: "line-through" }}>
                ₹{variety.price.toFixed(2)}
              </span>
            </Typography>
          </>
        ) : (
          <Typography variant="body2" className="popup-text-p">
            Price: ₹{variety?.price.toFixed(2)}
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
