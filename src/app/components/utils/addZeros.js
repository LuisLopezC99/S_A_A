 const calculateZeros = (num, isConsecutive = false) =>{
    let zeros = ""
    let i = 0 
    for ( isConsecutive ? i = 3 : i = 2 ; i > num.toString().length; i--) {
      zeros += "0"
    }
    return zeros;
  } 

  export default  calculateZeros