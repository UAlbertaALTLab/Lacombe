function wrap {
    for i in `seq 0 $1`; do
        echo "$2$i$3"
    done
}

N=15 # Change this accordingly to number of files, that you want to feed to tesseract or export it as a script parameter.

# Uncomment this line if, you're rerunning the script
rm fra.pffmtable fra.shapetable fra.traineddata fra.unicharset unicharset font_properties fra.inttemp fra.normproto *.tr *.txt

for i in `seq 0 $N`; do
    tesseract fra.lacombe.exp$i.tiff fra.lacombe.exp$i nobatch box.train
done
unicharset_extractor `wrap $N "fra.lacombe.exp" ".box"`
echo "lacombe 0 0 1 0 0" > font_properties # tell Tesseract informations about the font
mftraining -F font_properties -U unicharset -O fra.unicharset `wrap $N "fra.lacombe.exp" ".tr"`
cntraining `wrap $N "fra.lacombe.exp" ".tr"`
# rename all files created by mftraing en cntraining, add the prefix fra.:
    mv inttemp fra.inttemp
    mv normproto fra.normproto
    mv pffmtable fra.pffmtable
    mv shapetable fra.shapetable
combine_tessdata fra.
