const Container = (props) => {
  return (
    <div className="mb-5">
      <h3 className="mb-3">{props.title}</h3>
      <div>
          {props.text}
      </div>
    </div>
  );
};

export default Container;
