const AlbumDetailsTracks = ({ title, tracknumber }) => {
  console.log(`${tracknumber}. ${title}`);
  return (
    <p>
      {tracknumber}. {title}
    </p>
  );
};

export default AlbumDetailsTracks;
