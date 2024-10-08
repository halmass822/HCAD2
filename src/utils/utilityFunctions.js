export function digitizeNumber(input, digits = 2) {
	const length_difference = digits - String(input).length;
  if(length_difference < 0) {
  	throw `digitize(${input}, ${digits}) error\ninput longer than target digits`
  } else if(length_difference === 0) {
    return input;
  } else {
  	let output = String(input);
  	for(let i = 0; i < length_difference; i++) {
    	output = "0" + output;
    }
    return output;
  }
}

export const getMMSS = (input = "now") => {
    const currentTime = input ==="now" ? new Date() : new Date(input);
    return `${digitizeNumber(currentTime.getMinutes())}:${digitizeNumber(currentTime.getSeconds())}`;
}

export const getHHMM = (input = "now") => {
  const currentTime = input ==="now" ? new Date() : new Date(input);
  return `${digitizeNumber(currentTime.getHours())}:${digitizeNumber(currentTime.getMinutes())}`;
}

export const orderCallsByPriority = (a, b) => Number(a.priority) - Number(b.priority); //to use in sort functions