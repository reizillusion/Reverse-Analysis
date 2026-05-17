import { cases, ending, evidenceLibrary } from "./data/cases.js";
import { ReverseAnalysisGame } from "./game.js";

const game = new ReverseAnalysisGame({
  cases,
  evidenceLibrary,
  ending,
});

game.init();
