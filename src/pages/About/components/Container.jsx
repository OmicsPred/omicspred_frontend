const Container = (props) => {
  let div_id = props.title.replaceAll(' ','_');
  return (
    <div className="mb-5" id={div_id.toLowerCase()}>
      <h3 className="mb-3">{props.title}</h3>
      <div>
          {props.text}
      </div>
    </div>
  );
};

export default Container;
