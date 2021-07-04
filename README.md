# Applying OCR to Lacombe's _Dictionnaire de la langue des Cris_ (1874)

This project uses the optical character recognition (OCR) tool [Tesseract][Tesseract] to extract text from Albert S. Lacombe's (1874) _Dictionnaire de la langue des Cris_ and convert it into a useable database following the [Data Format for Digital Linguistics][DaFoDiL] (DaFoDiL).

## Contents

<!-- TOC -->

- [Scans](#scans)
- [Text Versions](#text-versions)
- [Using Tesseract](#using-tesseract)
  - [Language](#language)
  - [Page Segmentation Mode](#page-segmentation-mode)
  - [Disabling Dictionaries](#disabling-dictionaries)
  - [Word Lists](#word-lists)
  - [Allowed Character List](#allowed-character-list)
- [OCR Results](#ocr-results)
- [Comparing OCR Outputs](#comparing-ocr-outputs)
- [Calculating OCR Accuracy](#calculating-ocr-accuracy)
- [Accuracy Reports](#accuracy-reports)
- [Notes on Gold Standard Transcriptions](#notes-on-gold-standard-transcriptions)

<!-- /TOC -->

## Scans

We have high-quality scans available from the following sources:

* [John Carter Brown Library](https://archive.org/details/dictionnairedela01laco) (color; 98 MB; `Carter.pdf`)
* U.S. Library of Congress (83 MB; `LOC.pdf`)
* [Oxford](https://archive.org/details/dictionnairedel00lacogoog) (B&W, from microfilm; 44 MB; `Oxford.pdf`)
* [Bibliothèque et Archives Nationales du Québec](https://numerique.banq.qc.ca/patrimoine/details/52327/3994014) (915 MB; `Quebec.pdf`)
* [Peel Library](https://drive.google.com/drive/folders/1AtauHmz8qh_Bfp0YvyZsGhb9IioeiTSl) (individual pages, B&W, from microfilm, .tif format; `Peel.pdf`)

## Text Versions

Aside from the OCR'd text version of Lacombe that we ourselves are producing, the following text versions also exist for the Lacombe dictionary. All of these are located in the `OCR/` folder.

* [John Carter Brown Library](./OCR/Brown/full.txt)
* [U.S. Library of Congress](./OCR/LOC/full.txt)
* [Oxford](./OCR/Oxford/full.txt)
* [Peel](./OCR/Peel/full.txt)
* [Quebec](./OCR/Quebec/full.txt)

The version from the Bibliothèque et Archives Nationales du Québec is by far the highest-quality scan available, so this is the scan we are using for our own OCR process.

## Using Tesseract

* [user manual](https://tesseract-ocr.github.io/tessdoc/)
* [command line usage](https://tesseract-ocr.github.io/tessdoc/Command-Line-Usage.html)
* [old manual pages](https://tesseract-ocr.github.io/tessdoc/Documentation.html#manual-pages)

This section explains the various options we selected when using Tesseract 5.0 for optical character recognition on the Quebec scans. Consult the [Tesseract documentation][Tesseract] for more detailed instructions.

**NOTE:** You can process multiple image files in a single run by saving the list of filenames as a text file, and provide the path to that text file in place of the `<path to image>` argument instead.

Basic command line usage:

```
tesseract <path to image> <path to output file>
```

### Language

Set the language using the `-l` flag.

Language | Accuracy
---------|--------:
`eng`    |   86.45%
`fra`    |   88.28%

### Page Segmentation Mode

See [the docs](https://tesseract-ocr.github.io/tessdoc/ImproveQuality.html#page-segmentation-method) on available page segmentation modes.

Set the page segmentation mode using the `--psm` flag.

Adjusting the page segmentation mode did not have any effect on the accuracy of the output.

### Disabling Dictionaries

From [the documentation](https://tesseract-ocr.github.io/tessdoc/ImproveQuality.html#dictionaries-word-lists-and-patterns):

> Disabling the dictionaries Tesseract uses should increase recognition if most of your text isn’t dictionary words. They can be disabled by setting both of the configuration variables `load_system_dawg` and `load_freq_dawg` to `false`.

Disabling dictionaries did not have any effect on the accuracy of the output.

### Word Lists

From [the documentation](https://tesseract-ocr.github.io/tessdoc/ImproveQuality.html#dictionaries-word-lists-and-patterns):

> It is also possible to add words to the word list Tesseract uses to help recognition, or to add common character patterns, which can further help to improve accuracy if you have a good idea of the sort of input you expect. This is explained in more detail in the [Tesseract manual](https://github.com/tesseract-ocr/tesseract/blob/master/doc/tesseract.1.asc#config-files-and-augmenting-with-user-data).

### Allowed Character List

From [the documentation](https://tesseract-ocr.github.io/tessdoc/ImproveQuality.html#dictionaries-word-lists-and-patterns):

> If you know you will only encounter a subset of the characters available in the language, such as only digits, you can use the `tessedit_char_whitelist` configuration variable. See the FAQ for an example.

The characters used in the gold standard are:

`!()+,-.0123456789:;ABCDEGHIJKLMNOPRSTUVWYabcdefghijklmnopqrstuvwxyz«ÂÉÊÎàâäçèéêîïôùûœ’`

## OCR Results

This section shows the results we achieved from running Tesseract on the Quebec scans ourselves. Click the **link** in the **Report** column to see the accuracy report for that particular set of Tesseract options. See the [Accuracy](#accuracy) section below for more details on how to read the accuracy reports.

Options    | Accuracy | Report
-----------|---------:|:-------------------------------:
no options |   90.41% | [link](./OCR/Quebec/reports/no-options.txt)

## Comparing OCR Outputs

This section compares the OCR text outputs for the different scans.

It was decided up front that the text version of the Oxford scans is too poor quality to be usable:

> for some reason or another, large sections of some pages seem to be missing, or at least thrown out of order in a such a way as to make them almost impossible to find, a fact not helped by the generally poor quality of the text. In any case, I made the judgement that if it was this difficult to even distinguish pages in the Oxford OCR, it was probably reasonable to assume that its contents cannot be used. (@DBDacanay)

Source | Accuracy |               Report
-------|---------:|:---------------------------------:
Brown  |   85.86% | [report](./OCR/Brown/accuracy.txt)
LOC    |   87.96% |  [report](./OCR/LOC/accuracy.txt)
Peel   |   60.79% | [report](./OCR/Peel/accuracy.txt)

## Calculating OCR Accuracy

The accuracy of the OCR results was compared against the manually-transcribed gold standard files (located in `OCR/standard/`) using the [ocreval][ocreval] library (by @eddieantonio). For each set of options, an accuracy report was produced using ocreval and saved in `OCR/Quebec/reports/`. See the [ocreval user guide](./ocreval-user-guide.pdf) (specifically §2.1) for details concerning how to read the accuracy report.

To run the accuracy report, first install [ocreval][ocreval]. Then run the following command:

```
accuracy <OCR output> <gold standard> [out file]
```

The `accuracy` script takes the following 3 arguments:

1. `<OCR output>`: the output generated by the OCR engine
2. `<gold standard>`: the gold standard / source of truth for the text being evaluated
3. `[out file]`: [optional] the location where the accuracy report should be saved

To combine multiple pages of OCR output or gold standard together for aggregated comparison of multiple pages at once, first make sure you have [Node and npm][Node] installed, then run the following command (where `<directory>` is the path to a folder containing text files you would like to concatenate together, and `<outfile>` is the path to the file where you would like the results saved). This script will only combine files with a `.txt` extension. You can then run ocreval on the combined file.

`node lib/concat.js <directory> <outfile>`

You can also concatenate both the `OCR/standard/sample/` and `OCR/Quebec/sample` folders with a single command, `npm run concat`. This will create `OCR/standard/sample.txt` and `OCR/Quebec/sample.txt` files for comparison.

Finally, you can run ocreval on these two combined files with `npm run accuracy`. This will create an accuracy report titled `accuracy.txt` in the project root.

## Accuracy Reports

The first section of the accuracy report contains general statistics:

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

The following conventions help improve the reliability of the accuracy report:

* The gold standard must have hard-coded line breaks. Adding line breaks improved the accuracy score by 5%.
* The gold standard must have hyphens whenever the original text has hyphens. (These were added with the line breaks.)
* The gold standard must be NFC normalized. (This was already done in @DBDacanay's original.)
* The gold standard must have leading guillemets (`«`) and/or crosses (`x`). Adding these improved the accuracy score by 2.09%.

<!-- LINKS -->

[DaFoDiL]:   https://format.digitallinguistics.io
[Node]:      https://nodejs.org/en/
[ocreval]:   https://github.com/eddieantonio/ocreval
[Tesseract]: https://github.com/tesseract-ocr/tesseract
