import { MatchReader } from "./MatchReader";
import { Summary } from "./Summary";

// const csvFileReader = new CsvFileReader("football.csv");
// const matchReader = new MatchReader(csvFileReader);
// matchReader.load();

const matchReader = MatchReader.fromCsv("football.csv");
matchReader.load();
const summary = Summary.winsAnalysisWithHtmlReport("Man United");

summary.buildAndPrintReport(matchReader.matches);

//! inheritance vs composition
// inheritance => Characterized by an 'is a' relationship between two classes
// composition => Characterized by a 'has a' relationship between two classes
