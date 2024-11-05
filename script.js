/**
 * Function to calculate cosine similarity between two text inputs
 * Adapted from: 
 * "Building a Text Similarity Checker Using Cosine Similarity in JavaScript and HTML" by Analytics Vidhya
 * Medium, [date accessed: November 5, 2024].
 * Available at: https://medium.com/analytics-vidhya/building-a-text-similarity-checker-using-cosine-similarity-in-javascript-and-html-75722d485703
 */


function wordCountMap(str){
    let words = str.split(' ');
    let wordCount = {};
    words.forEach((w)=>{
        wordCount[w] = (wordCount[w] || 0) +1;

    });
return wordCount;
}

wordCountMap = wordCountMap("brodie are you good are  ")

let dict = {}

function addWordsToDictionary(wordCountmap, dict){
    for(let key in wordCountmap){
        dict[key] = true;
    }
}

addWordsToDictionary(wordCountMap, dict)

console.log(dict, wordCountMap)


function wordMapToVector(map,dict){
    let wordCountVector = [];
    for (let term in dict){
        wordCountVector.push(map[term] || 0);
    }
    return wordCountVector;
}

function dotProduct(vecA, vecB){
    let product = 0;
    for(let i=0;i<vecA.length;i++){
        product += vecA[i] * vecB[i];
    }
    return product;
}

function magnitude(vec){
    let sum = 0;
    for (let i = 0;i<vec.length;i++){
        sum += vec[i] * vec[i];
    }
    return Math.sqrt(sum);
}

function cosineSimilarity(vecA,vecB){
    return dotProduct(vecA,vecB)/ (magnitude(vecA) * magnitude(vecB));
}


function textCosineSimilarity(txtA,txtB){
    const wordCountA = wordCountMap(txtA);
    const wordCountB = wordCountMap(txtB);
    let dict = {};
    addWordsToDictionary(wordCountA,dict);
    addWordsToDictionary(wordCountB,dict);
    const vectorA = wordMapToVector(wordCountA,dict);
    const vectorB = wordMapToVector(wordCountB,dict);
    return cosineSimilarity(vectorA, vectorB);
}


function getSimilarityScore(val){
    return Math.round(val * 100)
}

function checkSimilarity(){
    const text1 = $('#text1').val();
    const text2 = $('#text2').val();
    const similarity = getSimilarityScore(textCosineSimilarity(text1,text2));
    $("#similarity").text(similarity+"%");
}


$('#checkSimilarity').on('click', () => {
  const text1 = $('#text1').val();
  const text2 = $('#text2').val();
  const similarity = getSimilarityScore(textCosineSimilarity(text1,text2));

    $('#result').text(`Similarity Score: ${similarity.toFixed(2)}%`);
  } else {
    $('#result').text('Please enter both essays.');
  }
});
