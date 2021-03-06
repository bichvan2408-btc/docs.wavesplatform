const fs = require('fs');
const path = require('path');

const getRawIcon = (relativePath) => {
    return fs.readFileSync(path.resolve(__dirname, relativePath)).toString()
};

module.exports = {
    backToIndexButtonText: 'Back to index',
    sidebarOnThisPageText: 'On this page',

    languageAbsenceNotification: {
        title: 'Oops…',
        message: 'The content of this page is currently unavailable.<br>Sorry for the inconvenience!',
    },

    nav: [
        // {
        //     text: 'Home',
        //     link: '/en/'
        // },
        // {
        //     text: 'Blockchain',
        //     link: '/en/blockchain/'
        // },
    ],
    homePage: {
        technologyList: {
            learnAboutWavesPlatform: {
                rootLink: '/en/blockchain/',
                type: 'beginner',
                iconFilePath: getRawIcon('./images/category1.svg'),
                buttonSet: {
                    account: {
                        text: 'Account',
                        link: '/en/blockchain/account'
                    },
                    token: {
                        text: 'Tokens',
                        link: '/en/blockchain/token'
                    },
                    mining: {
                        text: 'Mining',
                        link: '/en/blockchain/mining'
                    },
                    transaction: {
                        text: 'Transactions',
                        link: '/en/blockchain/transaction'
                    }
                }
            },
            buildingBlockchainApps: {
                rootLink: '/en/building-apps/',
                type: 'advanced',
                iconFilePath: getRawIcon('./images/rocket.svg'),
                buttonSet: {
                    smartAccount: {
                        text: 'Smart accounts',
                        link: '/en/building-apps/smart-contracts/what-is-smart-account'
                    },
                    smartAsset: {
                        text: 'Smart assets',
                        link: '/en/building-apps/smart-contracts/smart-assets'
                    },
                    dapp: {
                        text: 'dApps',
                        link: '/en/building-apps/smart-contracts/what-is-a-dapp'
                    }
                }
            },
            rideProgrammingLanguage: {
                rootLink: '/en/ride/',
                type: 'advanced',
                iconFilePath: getRawIcon('./images/category5.svg'),
                buttonSet: {
                    gettingStarted: {
                        text: 'Getting started',
                        link: '/en/ride/getting-started'
                    },
                },

            },
            node: {
                rootLink: '/en/waves-node/',
                type: 'advanced',
                iconFilePath: getRawIcon('./images/category2.svg'),
                buttonSet: {
                    launch: {
                        text: 'Launch a node',
                        link: '/en/waves-node/waves-node-in-docker',
                    },
                    grpc: {
                        text: 'gRPC server',
                        link: '/en/waves-node/extensions/grpc-server',
                    },
                    nodeApi: {
                        text: 'Node REST API',
                        link: '/en/waves-node/node-api',
                    },
                },
            },
            ecosystemApplications: {
                rootLink: '/en/ecosystem/',
                type: 'beginner',
                iconFilePath: getRawIcon('./images/category3.svg'),
                buttonSet: {
                    explorer: {
                        text: 'Explorer',
                        link: '/en/ecosystem/waves-explorer/about-waves-explorer',
                    },
                    faucet: {
                        text: 'Free Waves on Testnet',
                        link: '/en/ecosystem/waves-explorer/account-balance-top-up-in-the-test-network',
                    },
                    oracles: {
                        text: 'Oracles',
                        link: '/en/ecosystem/waves-oracles/about-waves-oracles',
                    },
                    torenRating: {
                        text: 'Token Rating',
                        link: '/en/ecosystem/waves-token-rating/about-waves-token-rating',
                    },
                },
            },
            miscellaneous: {
                rootLink: '/en/keep-in-touch/',
                type: 'supplementary',
                iconFilePath: getRawIcon('./images/category7.svg'),
                buttonSet: {
                    blog: {
                        text: 'Official blog',
                        link: 'https://blog.wavesplatform.com/',
                    },
                    forum: {
                        text: 'Forum',
                        link: 'https://forum.wavesplatform.com/',
                    },
                    chat: {
                        text: 'Developer chat',
                        link: 'https://t.me/waves_ride_dapps_dev'
                    }
                },
            }
        },
    },

    searchPopup: {
        cancelText: 'Cancel',
        resultsMatchingText: 'results matching',
        showMoreText: 'Show more',
        minQueryLength: 4,
        limitationQueryText: 'A search query can be a minimum of 4 characters',
        noSuchResults: 'No such results',
    },

    footer: {
        broughtToYouByWavesTeam: 'Brought to you by Waves Team.',
        copyright: '© 2020 Waves Platform',
        email: '',
        resourcesCategories: {
            productsAndTools: {
                title: 'Products & tools',
                links: {
                    wavesKeeper: {
                        title: 'Waves Keeper',
                        link: 'https://wavesplatform.com/technology/keeper',
                    },
                    wavesBlockchain: {
                        title: 'Waves Blockchain',
                        link: 'https://wavesplatform.com/technology',
                    },
                    WavesIde: {
                        title: 'Waves IDE',
                        link: 'https://ide.wavesplatform.com/',
                    },
                    wavesExplorer: {
                        title: 'Waves Explorer',
                        link: 'https://wavesexplorer.com/',
                    },
                },
            },
            forDevelopers: {
                title: 'For developers',
                links: {
                    gitHub: {
                        title: 'GitHub',
                        link: 'https://github.com/wavesplatform',
                    },
                    stackOverflow: {
                        title: 'Stack Overflow',
                        link: 'https://stackoverflow.com/questions/tagged/wavesplatform',
                    },
                    wavesLabs: {
                        title: 'Waves Labs',
                        link: 'https://waveslabs.com',
                    },
                    web3Course: {
                        title: 'Web3 Course',
                        link: 'https://stepik.org/course/54415/promo',
                    },
                },
            },
            // legal: {
            //     title: 'Legal',
            //     links: {
            //         privacyPolicy: {
            //             title: 'Privacy Policy',
            //             link: '#',
            //         },
            //         termsOfUse: {
            //             title: 'Terms of use',
            //             link: '#',
            //         },
            //         cookies: {
            //             title: 'Cookies',
            //             link: '#',
            //         },
            //         gdpr: {
            //             title: 'GDPR',
            //             link: '#',
            //         },
            //     },
            // },
            social: {
                title: 'Social',
                links: {
                    blog: {
                        title: 'Blog',
                        link: 'https://blog.wavesplatform.com',
                    },
                    twitter: {
                        title: 'Twitter',
                        link: 'https://twitter.com/wavesplatform',
                    },
                    telegram: {
                        title: 'Telegram',
                        link: 'https://t.me/WavesCommunity',
                    },
                    forum: {
                        title: 'Forum',
                        link: 'https://forum.wavesplatform.com',
                    },
                    medium: {
                        title: 'Medium',
                        link: 'https://medium.com/@waves.exchange',
                    },
                },
            },
        },
    },
}
