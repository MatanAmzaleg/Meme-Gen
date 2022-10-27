'use strict'


let gKeywordSearchCountMap = { 'funny': 0, 'politics': 0, 'movies': 0, 'animals' : 0 , 'kids': 0 , 'series': 0 , 'crazy': 0, 'tired': 0, 'success':0, 'love':0, 'nature': 0, 'angry':0, 'serious': 0}

var gImgs = [
    { id: 1, url: 'meme-imgs/006.jpg',
 keywords: [ 'animals', 'tired', 'love'] },
 { id: 2, url: 'meme-imgs/5.jpg',
 keywords: ['kids', 'funny', 'success'] },
 { id: 3, url: 'meme-imgs/005.jpg',
 keywords: ['tired', 'animals', 'kids'] },
 { id: 4, url: 'meme-imgs/004.jpg',
 keywords: ['animals', 'love', 'nature'] },
 { id: 5, url: 'meme-imgs/003.jpg',
 keywords: ['politics', 'crazy', 'tired'] },
 { id: 6, url: 'meme-imgs/2.jpg',
 keywords: ['love', 'nature'] },
 { id: 7, url: 'meme-imgs/drevil.jpg',
 keywords: ['crazy', 'movies'] },
 { id: 8, url: 'meme-imgs/Ancient-Aliens.jpg',
 keywords: ['crazy', 'funny', 'moveis'] },
 { id: 9, url: 'meme-imgs/19.jpg',
 keywords: ['crazy', 'funny', 'angry'] },
 { id: 10, url: 'meme-imgs/12.jpg',
 keywords: ['series'] },
 { id: 11, url: 'meme-imgs/9.jpg',
 keywords: ['funny', 'kids', 'nature'] },
 { id: 12, url: 'meme-imgs/8.jpg',
 keywords: ['movies', 'kids'] },
 { id: 13, url: 'meme-imgs/img12.jpg',
 keywords: ['love', 'angry'] },
 { id: 14, url: 'meme-imgs/img11.jpg',
 keywords: ['funny', 'politics'] },
 { id: 15, url: 'meme-imgs/img6.jpg',
 keywords: ['funny', 'animals', 'tired'] },
 { id: 16, url: 'meme-imgs/img5.jpg',
 keywords: ['funny', 'kids'] },
 { id: 17, url: 'meme-imgs/img4.jpg',
 keywords: ['politics', 'animals', 'angry'] },
 { id: 18, url: 'meme-imgs/img2.jpg',
 keywords: ['funny', 'kids', 'nature'] },
 { id: 19, url: 'meme-imgs/putin.jpg',
 keywords: ['politics', 'crazy', 'serious'] },
 { id: 20, url: 'meme-imgs/patrick.jpg',
 keywords: ['movies', 'crazy'] },
 { id: 21, url: 'meme-imgs/Oprah-You-Get-A.jpg',
 keywords: ['love'] },
 { id: 22, url: 'meme-imgs/One-Does-Not-Simply.jpg',
 keywords: ['movies', 'series'] },
 { id: 23, url: 'meme-imgs/meme1.jpg',
 keywords: ['movies', 'serious'] },
 { id: 24, url: 'meme-imgs/leo.jpg',
 keywords: ['funny', 'movies', 'success'] },
];


function getImg(id){
  return  gImgs.find(img => img.id === id)
}

function getImgs(){
  return gImgs
}

function changeFilter(cat){
  gKeywordSearchCountMap[cat]++
  return gKeywordSearchCountMap[cat]
}