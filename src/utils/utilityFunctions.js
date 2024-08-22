export function digitizeNumber(input, digits = 2) {
	const length_difference = digits - String(input).length;
  if(length_difference < 1) {
  	throw `digitize(${input}, ${digits}) error\ninput longer than target digits`
  } else {
  	let output = String(input);
  	for(let i = 0; i < length_difference; i++) {
    	output = "0" + output;
    }
    return output;
  }
}

export const getCurrentMMSS = () => {
    const currentTime = new Date();
    return `${digitizeNumber(currentTime.getMinutes())}:${digitizeNumber(currentTime.getSeconds)}`;
}

