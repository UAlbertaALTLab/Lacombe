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

We obtained the following results using Tesseract 5.0.

Options | Accuracy | Notes
--------|----------|------
``        |          |

<!-- LINKS -->

[DaFoDiL]:   https://format.digitallinguistics.io
[Tesseract]: https://github.com/tesseract-ocr/tesseract
