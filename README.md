# 2-Up Rank

Rank a list of options by presenting two at a time and choosing a favourite.

## Install

*Prerequisites*
* Requires node and yarn

```
$ yarn install
```

## Usage

```
$ node ./index.js <inputFile>
```

`inputFile` should be any text file which lists options one-per-line. (see `examples/cars.txt` for an example)

### Example

```
$ node ./index.js examples/cars.txt
✔ Ford vs. GM › Ford
✔ Honda vs. Tesla › Tesla
✔ Tesla vs. Mazda › Tesla
✔ GM vs. Tesla › Tesla
✔ Mazda vs. GM › Mazda
✔ Ford vs. Mazda › Mazda
✔ Honda vs. Ford › Ford
✔ Ford vs. Tesla › Tesla
✔ Mazda vs. Honda › Mazda
✔ GM vs. Honda › Honda
Final rank:
Tesla: 1701.160082583458
Mazda: 1349.6265165697446
Ford: 988.3574320156827
Honda: 683.1651962660189
GM: 277.6907725650961
```
