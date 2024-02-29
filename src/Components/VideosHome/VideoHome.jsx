import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Data } from "../../DataFake/Data";

function VideoHome() {
  const [cardIndex, setCardIndex] = useState(0);
  const [lastSelectedIndex, setLastSelectedIndex] = useState(null);

  const [dragging, setDragging] = useState(false);
  const [inicioX, setInicioX] = useState(null);
  const [finX, setFinX] = useState(null);

  const nextCard = () => {
    let nextIndex = cardIndex + 1;

    if (nextIndex >= Data.length) {
      nextIndex = 0;
    }

    setLastSelectedIndex(cardIndex);
    setCardIndex(nextIndex);
  };

  const backCard = () => {
    let nextIndex = cardIndex - 1;

    if (nextIndex >= Data.length) {
      nextIndex = Data.length;
    }

    setLastSelectedIndex(cardIndex);
    setCardIndex(nextIndex);
  };

  const handleMouseDown = (event) => {
    const x = event.clientX;
    setInicioX(x);
    setFinX(x);
  };

  const handleMouseMove = (event) => {
    if (inicioX !== null) {
      const x = event.clientX;
      setFinX(x);
    }
  };

  const handleMouseUp = () => {
    if (inicioX > finX+50) {
      backCard();

      setDragging(true);

      setTimeout(() => {
        setDragging(false);
      }, 1000);
    }

    if (inicioX < finX -50) {
      nextCard();
    }

    setInicioX(null);
    setFinX(null);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Solo avanzar la tarjeta si no se está arrastrando
      if (!dragging) {
        nextCard();
      }
    }, 5000);

    return () => clearInterval(intervalId);
  });

  return (
    <div
      className={
        cardIndex !== Data.length - 1
          ? "container-main-card-video-reverse"
          : "container-main-card-video"
      }
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <button onClick={nextCard}>
        <ArrowBackIcon />
      </button>
      {Data.map((item, id) => (
        <div
          key={id}
          className={`card-video ${
            dragging === true
              ? id === cardIndex
                ? "selected"
                : id === lastSelectedIndex
                ? "last-selected"
                : id === (cardIndex + 1 + Data.length) % Data.length
                ? "previous"
                : ""
              : id === cardIndex
              ? "previousDrag"
              : id === lastSelectedIndex
              ? "selectedDrag"
              : id === (cardIndex - 2 + Data.length) % Data.length
              ? "last-selectedDrag"
              : ""
          }`}
        >
          <video src={item?.video} />
          <div className="text-primary">
            <h3>{item?.name}</h3>
            <p>{item?.usdtPrice}</p>
          </div>
          <div className="text-secondary">
            <h4>{item?.subName}</h4>
            <p>
              {item?.currency} {item?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default VideoHome;
