# Applying OCR to Lacombe's _Dictionnaire de la langue des Cris_ (1874)

This project uses the optical character recognition (OCR) tool [Tesseract][Tesseract] to extract text from Albert S. Lacombe's (1874) _Dictionnaire de la langue des Cris_ and convert it into a useable database following the [Data Format for Digital Linguistics][DaFoDiL] (DaFoDiL).

## Scans

We have high-quality scans available from the following sources:

* [John Carter Brown Library](https://archive.org/details/dictionnairedela01laco) (color; 98 MB; `Carter.pdf`)
* U.S. Library of Congress (83 MB; `LOC.pdf`)
* [Oxford](https://archive.org/details/dictionnairedel00lacogoog) (B&W, from microfilm; 44 MB; `Oxford.pdf`)
* [Bibliothèque et Archives Nationales du Québec](https://numerique.banq.qc.ca/patrimoine/details/52327/3994014) (915 MB; `Quebec.pdf`)
* [Peel Library](https://drive.google.com/drive/folders/1AtauHmz8qh_Bfp0YvyZsGhb9IioeiTSl) (individual pages, B&W, from microfilm, .tif format; `Peel.pdf`)

The version from the Bibliothèque et Archives Nationales du Québec is by far the highest-quality scan available, so this is the scan we are using for the OCR process.

## Results

We obtained the following results using Tesseract 5.0. Consult the [Tesseract documentation][Tesseract] for the meaning of the various command line options.

Options    | Accuracy | Notes | Report
-----------|---------:|-------|:-------------------------------:
no options |   85.37% |       | [link](./reports/289-no-options.txt)

## Accuracy

The accuracy of the OCR results was compared against the manually-transcribed gold standard files (located in `manual/`) using the [ocreval][ocreval] library (by @eddieantonio). For each set of options, an accuracy report was produced using ocreval and saved in `reports/`. See the [ocreval user guide](./ocreval-user-guide.pdf) (specifically §2.1) for details concerning how to read the accuracy report.

The first section contains general statistics:

* `Characters`: The number of characters in the gold standard.
* `Errors`: The number of character errors.
* `Accuracy`: The overall accuracy percentage.

There are 3 types of errors, summarized in the third section of the accuracy report:

* `Ins`: insertion errors
* `Subst`: substitution errors
* `Del`: deletion errors

The fourth section of the report shows accuracy by character class.

The fifth section of the report lists all the errors types, sorted largest to smallest by number of times each error occurs. The number of errors of each type can be divided by the edit distance between the correct and generated forms to count the number of times this error occurred.

The sixth section of the report lists each character in the gold standard, the number of times that character was missed by the OCR, and the overall accuracy for that character.

## Notes on Gold Standard Transcriptions

* The gold standard must have hard-coded line breaks in order to receive a reliable accuracy score when measured against the OCR output.
* The gold standard must have hyphens whenever the original text has hyphens.

<!-- LINKS -->

[DaFoDiL]:   https://format.digitallinguistics.io
[ocreval]:   https://github.com/eddieantonio/ocreval
[Tesseract]: https://github.com/tesseract-ocr/tesseract
