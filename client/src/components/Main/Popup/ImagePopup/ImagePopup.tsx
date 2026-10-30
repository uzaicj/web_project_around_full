type ImagePopupProps = {
  image: string;
  caption: string;
};

export default function ImagePopup(
  props: ImagePopupProps
): React.JSX.Element {
  const { image, caption } = props;

  return (
    <>
      <img
        className="popup__image"
        src={image}
        alt={caption}
      />
      <p className="popup__caption">{caption}</p>
    </>
  );
}