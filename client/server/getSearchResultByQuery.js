const processEnv = process.env;
const envIsDev = processEnv.isDev;
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
// const puppeteer = require('puppeteer');
const Fuse = require('fuse.js');
// const DomParser = require('dom-parser');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;


const vuepressDestPath = path.join(__dirname, '../vuepress');

const readFileAsync = promisify(fs.readFile);

// const parser = new DomParser();

const fuseOptions = {
    // include: ['score', 'matches'],
    // keys: [{
    //     name: 'title',
    //     weight: 0.1
    // }, {
    //     name: '_content',
    //     weight: 0.1
    // }],
    // keys: [
    //     "title",
    //     "author.firstName"
    // ]
    // id: 'ISBN'
    keys: ['title', 'content'],

    tokenize: true,
    matchAllTokens: true,



    shouldSort: true,

    findAllMatches: true,
    includeScore: true,
    includeMatches: true,

    threshold: 0.1,


    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 4,
    // caseSensitive: true,
};

const findItemForSendingLimit = 10;
const textLeftRightRangeLength = 40;
// const limit


module.exports = async function() {
    const vuepressPagesParamsListString = fs.readFileSync(`${vuepressDestPath}/documentation-files-map.json`).toString();

    let vuepressPagesParamsList = null;

    try {
        vuepressPagesParamsList = JSON.parse(vuepressPagesParamsListString);
    } catch (error) {
        console.error(error);
    }

    if(!vuepressPagesParamsList) {
        console.error('Vuepress pages list with paths not found');
        return;
    }

    // const browser = await puppeteer.launch();

    const vuepressPages = {};

    if(envIsDev) {
        vuepressPagesParamsList = vuepressPagesParamsList.slice(0,30);
    }
    for(let vuepressPageParams of vuepressPagesParamsList) {
        let vuepressPageRegularPath = vuepressPageParams.regularPath;
        const vuepressPageTitle = vuepressPageParams.title;
        const vuepressPageLocalePath = vuepressPageParams.localePath;

        if(!vuepressPageRegularPath.includes('.html')) {
            vuepressPageRegularPath = `${vuepressPageRegularPath}index.html`;
        }

        const pagePath = path.join(`${vuepressDestPath}/${vuepressPageRegularPath}`);
        // const vuepressPageContent = await readFileAsync(pagePath)
        //     .then(result => {
        //         return result.toString()
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });

        // const page = await browser.newPage();
        // await page.goto(`file:${pagePath}`);
        // const pageText = await page.evaluate(() => {
        //     // const pageElement = /*document.querySelector('body .page')*/document.body;
        //     const pageElement = document.querySelector('main');
        //     if(!pageElement) {
        //         return '';
        //     }
        //     return pageElement.innerText;
        // });

        const vuepressPageContent = await readFileAsync(pagePath)
            .then(result => {
                return result.toString()
            })
            .catch(error => {
                console.error(error);
            });

        const dom = new JSDOM(vuepressPageContent);
        let vuepressPageText = '';
        const pageDomMainElement = dom.window.document.querySelector('main');

        if(pageDomMainElement) {
            vuepressPageText = pageDomMainElement.textContent;
        }
        // replace(/\n/g, "<br />");
        // await page.close();

        vuepressPages[vuepressPageRegularPath] = {
            path: vuepressPageRegularPath,
            title: vuepressPageTitle,
            localePath: vuepressPageLocalePath,
            content: vuepressPageText.replace(/(?:\r\n|\r|\n)/g, ''),
        };


        console.log('Parsed page:', vuepressPageRegularPath);
    }

    // await browser.close();

    // let sortedPagesContentByLocalePath = vuepressPages.reduce((accumulator, page) => {
    //     const pageLocalePath = page.localePath;
    //     const accumulatorLocalePath = accumulator[pageLocalePath];
    //     if(!accumulatorLocalePath) {
    //         accumulator[pageLocalePath] = [];
    //     }
    //     accumulator[pageLocalePath].push(page);
    //     return accumulator;
    // }, {});


    const fuse = new Fuse(Object.values(vuepressPages), fuseOptions);


    const cutStringForSide = (side, string) => {
        const textLength = string.length;
        let textSubstringLength = textLeftRightRangeLength;

        if(side === 'left') {
            if(textSubstringLength * 2 > textLength) {
                textSubstringLength = Math.floor(textLength / 2)
            }
            string = string.substr(-textSubstringLength);
        } else {
            if(textSubstringLength * 2 > textLength) {
                textSubstringLength = Math.ceil(textLength / 2)
            }
            string = string.substring(0, textSubstringLength)
        }
        return string;
    };

    const formattedAndGroupSearchResults = (array) => {
        let group = [];
        let lastElementFromLatestGroup = '';
        return array.reduce((accumulator, element, elementIndex) => {

            const isElementArray = Array.isArray(element);

            if(elementIndex === 0 && isElementArray) {
                group.push('');
            }

            let textSubstring = element;

            if(isElementArray) {
                group.push(element);
            } else {
                /*left side*/
                if(group.length <= 1) {
                    textSubstring = cutStringForSide('left', textSubstring);

                    /*ride side*/
                } else {
                    textSubstring = cutStringForSide('right', textSubstring);
                }
                group.push(textSubstring)
            }

            if(group.length > 2) {
                accumulator.push(group);

                lastElementFromLatestGroup = element;

                if(!isElementArray) {
                    element = cutStringForSide('left', element);
                }

                group = [
                    element
                ];
            }
            return accumulator;
        }, []);
    };



    const textHighlightMarkup = (text, indices) => {
        const arrayWithSplitText = [];
        indices.forEach((index, indexNumber) => {
            const textLength = text.length;
            const lastIndex = text.length - 1;
            const previousIndex = indices[indexNumber - 1] || [0, 0];
            const previousIndexEnd = previousIndex[1];
            const start = index[0];
            const end = index[1];

            if(previousIndexEnd + start > 0) {
                arrayWithSplitText.push(
                    text.substring(previousIndexEnd + (indexNumber === 0 ? 0 : 1), start),
                )
            }
            arrayWithSplitText.push(
                [text.substring(start, end + 1)]
            )
            if(indexNumber === indices.length - 1 && end < lastIndex) {
                arrayWithSplitText.push(
                    text.substring(end, textLength)
                )
            }
        });

        return arrayWithSplitText;
    };


    return (searchQueryString) => {

        const fuseSearchResult = fuse.search(searchQueryString);

        const dataPreparedForSending = fuseSearchResult.map(page => {

                // console.log('page:', page);
                const matches = page.matches;
                const titleMatches = matches.find(item => item.key === 'title');
                const contentMatches = matches.find(item => item.key === 'content');

                let titleMatchesFormattedString = '';
                if(titleMatches) {
                    titleMatchesFormattedString = textHighlightMarkup(titleMatches.value, titleMatches.indices);
                }

                let contentMatchesFormattedString = '';
                if(contentMatches) {
                    contentMatchesFormattedString = textHighlightMarkup(contentMatches.value, contentMatches.indices);

                    contentMatchesFormattedString = formattedAndGroupSearchResults(
                        contentMatchesFormattedString
                    );

                    // console.log('contentMatchesFormattedString2:', contentMatchesFormattedString);

                }

                // console.log('titleMatchesFormattedString:', /*titleMatchesFormattedString,*/ contentMatchesFormattedString);

                return {
                    path: page.item.path,
                    localePath: page.localePath,
                    allMatchesLength: fuseSearchResult.length,
                    matches: {
                        title: titleMatchesFormattedString || [page.item.title],
                        content: contentMatchesFormattedString,
                    },


                }
            })
                .slice(0, findItemForSendingLimit)
        ;

        return dataPreparedForSending;
    }


};