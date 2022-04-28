const fs = require('fs')
const readline = require('readline')
const prompts = require('prompts')

if (process.argv.length !== 3) {
  console.debug(process.argv)
  console.error('ERROR: Missing argument.')
  console.error()
  console.error('Usage: ./index.js <infile>')
  process.exit(1)
}

const inFilename = process.argv[2]

async function main() {
  const rl = readline.createInterface({
    input: fs.createReadStream(inFilename),
    terminal: false
  })

  const candidates = []
  for await(const line of rl) {
    if (line.length !== 0) {
      candidates.push(line)
    }
  }

  const trials = []
  for (let i = 0; i < candidates.length; i++) {
    for (let j = i + 1; j < candidates.length; j++) {
      const a = candidates[i]
      const b = candidates[j]
    
      // Randomize pair order
      const pair = [a, b].sort(() => (Math.random() > 0.5) ? 1 : -1)
      trials.push(pair)
    }
  }

  // Jumble trials
  trials.sort(() => (Math.random() > 0.5) ? 1 : -1)

  // Order: [winner, loser]
  const results = []
  for (const [a, b] of trials) {
    // Limit the number of contests
    if (results.length >= 50) {
      break
    }

    const {answer} = await prompts({
      type: 'select',
      name: 'answer',
      message: `${a} vs. ${b}`,
      choices: [
        { value: a },
        { value: b },
      ]
    })

    if (answer === a) {
      results.push([a, b])
    } else if (answer === b) {
      results.push([b, a])
    } else {
      throw new Error(`Unexpected answer: ${answer}`)
    }
  }

  // Compute elo scores
  const INITIAL_SCORE = 1000
  const K = 400
  const scores = {}
  for (const candidate of candidates) {
    scores[candidate] = INITIAL_SCORE
  }

  for (const [winner, loser] of results) {
    const probW = scores[winner] / (scores[winner] + scores[loser])
    const probL = scores[loser] / (scores[winner] + scores[loser])

    scores[winner] = scores[winner] + (K * (1 - probW))
    scores[loser] = scores[loser] + (K * (0 - probL))
  }

  const ranks = Object.entries(scores).sort(([a, scoreA], [b, scoreB]) => scoreB - scoreA)

  console.log('Final rank: ')
  for (const [candidate, score] of ranks) {
    console.log(`${candidate}: ${score}`)
  }
}

main()
