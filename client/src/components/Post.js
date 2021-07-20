const Post = ({ id, title, description }) => {
  return (
    <div className="post">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Post;
