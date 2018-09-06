let swallowError = (error) =>{
  console.log(error.toString())
  this.emit('end')
}

export default swallowError;