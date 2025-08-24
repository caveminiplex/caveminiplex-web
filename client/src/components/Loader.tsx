const Loader = ({color}: {color: string}) => {
  return <span className="loader" style={{border:`2px solid ${color}`, borderRadius:"50%", width:"20px", height:"20px", animation:"rotation 1s linear infinite", borderBottomColor:"transparent"}}></span>;
};

export default Loader;
