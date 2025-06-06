const Container = (props) => {
  let div_id = props.title.replaceAll(' ','_');
  return (
    <div className="mb-5">
      <h3 className="mb-3" id={props.prefix+div_id.toLowerCase()}>{props.title}</h3>
      <div>
          {props.content}
      </div>
    </div>
  );
};

export default Container;
