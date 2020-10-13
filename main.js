// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (uniqNum, genBases) => {
  return {
    _specimenNum: uniqNum,
    _dna: genBases,
    get specimenNum() {
      return this._specimenNum;
    },
    get dna() {
      return this._dna;
    },
    set specimenNum(specimenNum) {
      return this._specimenNum = specimenNum;
    },
    set dna(dna) {
      return this._dna = dna;
    },
    //mutate one base in the current organism's dna, return mutated dna
    mutate() {
      let selectedBase = dna[Math.floor(Math.random() * dna.length)];
      let newRandBase = returnRandBase();
      if (selectedBase === newRandBase) {
        do {
          newRandBase = returnRandBase();
        } while (selectedBase === newRandBase);
      } else {
        selectedBase = newRandBase;
      }
      return dna;
    },
    //compare current organism's dna with passed in organism's dna
    compareDNA(newObj) {
      //define dna to compare
      let thisObjDNA = this.dna;
      let newObjDNA = newObj.dna;
      //counter for comparing dna
      let sharedCounter = 0;

      //Loop through both arrays to see if bases match, add to counter if true
      for (let i = 0; i < thisObj.length; i++) {
        let thisBase = thisObjDNA[i];
        let newBase = newObjDNA[i];
        if (thisBase === newBase) {
          sharedCounter++;
        }
      }

      //calculate percentage in common between the two organism's DNA
      let percentInCommon = sharedCounter / thisObj.length * 100;

      //return statement of what they have in common
      return `${this.specimenNum} and ${newObj.specimenNum} have ${percentInCommon}% DNA in common.`;
    },
    //check likelihood of organism surviving
    willLikelySurvive() {
      //create arrays of bases that match
      const cBases = this.dna.filter(base => base === 'C');
      const gBases = this.dna.filter(base => base === 'G');
      //get size of arrays
      const numCBases = cBases.length;
      const numGBases = gBases.length;
      //get size of total & dna array for comparison
      const totalBases = numCBases + numGBases;
      const totalDNA = this.dna.length;
      //calculate percent with C or G bases
      const percentBases = totalBases / totalDNA * 100;
      // true if likely to survive, false if not, based on conditions
      if (percentBases >= 60) {
        return true;
      } else {
        return false;
      }
    },
  }
}

const survivingSpecimen = [];
let idCounter = 1;

while (survivingSpecimen.length < 30) {
  let newOrg = pAequorFactory(idCounter, newStrand());
  if (newOrg.willLikelySurvive()) {
    survivingSpecimen.push(newOrg);
  }
  idCounter++;
}

console.log(survivingSpecimen);