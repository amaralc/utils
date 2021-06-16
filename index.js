function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const generateKey = ({
  timestamp,
  randomNumber,
  networkString,
  length
}) => {

  const timestampArray = timestamp.split('')
  const randomNumberArray = randomNumber.split('')
  const networkStringArray = networkString.split('')
  const arrayString = [...timestampArray, ...randomNumberArray, ...networkStringArray]

  const shuffledArray = shuffle(arrayString);
  const usedArray = shuffledArray.filter((_, index) => index < length)
  const safeArray = atob(usedArray.filter(item => item !== `=`))
  const key = safeArray.join('')

  return key
}

/**
 * 
 * @param {number} length - Length of desired key (defaults to 16 characteres)
 * @returns {string} Key
 */
const newKey = (length = 16) => {
  const timestamp = Date.now().toString()
  const randomNumber = Math.random().toString().split('.')[1]

  const networkString = btoa(JSON.stringify(require('os').networkInterfaces()))
  const key = generateKey({
    timestamp,
    randomNumber,
    networkString,
    length
  })

  return key
}

module.exports = {newKey};