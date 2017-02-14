const Elements = {
  in:{
    glyph:"music",
    title:"Instrument",
    fields:[
      {name:"name",type:"text"},
      {name:"ch",type:"text"},
      {name:"di",type:"checkbox"},
      {name:"phantom",type:"checkbox"}]
  },
  out:{
    glyph:"bullhorn",
    title:"Monitor",
    fields:[
      {name:"name",type:"text"},
      {name:"ch",type:"text"}],
  },
  box:{
    glyph:"th",
    title:"Stage box",
    fields:[
      {name:"channels in",type:"text"},
      {name:"channels out",type:"text"}],
  }
}
const fieldsToSpec = (type) => {
  return Elements[type].fields.reduce( (acc, cur, i) => {
    let {name,type} = cur;
    acc[name] = type === 'checkbox' ? false : '';
    return acc;
  },{});
}
export default Elements;
export {fieldsToSpec};
