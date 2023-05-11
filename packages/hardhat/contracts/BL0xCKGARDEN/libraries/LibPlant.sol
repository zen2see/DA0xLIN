// SPDX-License-Identifier: MIT
pragma solidity >=0.8.13<0.9.0;

import {LibAppStorage, AppStorage, Plant} from './LibAppStorage.sol';
import {IERC20} from "../../shared/interfaces/IERC20.sol";
import {IERC721} from "../../shared/interfaces/IERC721.sol";
import {LibERC20} from "../../shared/libraries/LibERC20.sol";
import {LibERC721} from "../../shared/libraries/LibERC721.sol";
import {LibDiamond} from "../../shared/libraries/LibDiamond.sol";
import {LibMeta} from "../../shared/libraries/LibMeta.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import "hardhat/console.sol";

struct PlantInfo  {
    uint256 tokenId;
    uint256 x; // x coordinates of the top left corner
    uint256 y; // y coordinates of the top left corner
    uint256 width;
    uint256 height;                                                                                                                         
    string fill; // plant color
    uint256 randomSeed;
}

library LibPlant {
    event PlantDimensions(uint256 indexed, uint256 _width, uint256 _height);

     // Return a random background color
    function backgroundColors(uint256 index)
        public
        pure
        returns (string memory)
    {
        string[7] memory bgColors = [
            "#ffffff",
            "#F1F1F1",
            "#EEF6FF",
            "#FCF8E8",
            "#EEF1FF",
            "#FFFDE3",
            "#2C3639"
        ];
        return bgColors[index];
    }

    // Return a random Plant color
    function plantColors(uint index) internal pure returns (string memory) {
        string[33] memory bColors = [
            "#1eafed",
            "#25316D",
            "#325fa3",
            "#367E18",
            "#38e27d",
            "#400D51",
            "#5d67c1",
            "#7294d4",
            "#A1C298",
            "#CC3636",
            "#F07DEA",
            "#F637EC",
            "#FA7070",
            "#a74f6c",
            "#c2c2d0",
            "#cc0e74",
            "#e5c37a",
            "#e6a0c4",
            "#e8185d",
            "#4bbe9d",
            "#fb97b3",
            "#ff0000",
            "#000007",
            "#2A0944",
            "#3330E4",
            "#5bbcd6",
            "#74275c",
            "#8758FF",
            "#96ac92",
            "#9c65ca",
            "#D800A6",
            "#F57328",
            "#FECD70"
        ];
        return bColors[index];
    }

    // Create an instance of a Plant
    function createBPlantStruct(
        uint256 x,
        uint256 y,
        uint256 width,
        uint256 height,
        uint256 randomSeed
    ) internal pure returns (Plant memory) {
        return
            Plant({
                x: x,
                y: y,
                width: width,
                height: height,
                fill: plantColors(randomSeed % 33), // Choose random color from bColors array
                randomSeed: randomSeed
            });
    }

    // Randomly picka a plant size: 1, 2, or 3x
    function drawPlantSize(uint maxSize, uint randomSeed)
        internal
        pure
        returns (uint size)
    {
        // Random number 1-100
        uint r = (randomSeed % 100) + 1;

        // Probabilities:
        // 3x: 20%
        // 2x: 25%
        // else: 1x
        if (maxSize == 3) {
            if (r <= 20) {
                return 3;
            } else if (r <= 45) {
                return 2;
            } else {
                return 1;
            }
        } else {
            // Probabilities:
            // 2x: 30%
            // else: 1x
            if (r <= 30) {
                return 2;
            } else {
                return 1;
            }
        }
    }

    // SVG code for a single plant
    function plantSvg(Plant memory plant) internal pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    '<rect x="',
                    uint2str(plant.x),
                    '" y="',
                    uint2str(plant.y),
                    '" width="',
                    uint2str(plant.width),
                    '" height="',
                    uint2str(plant.height),
                    '" fill="',
                    plant.fill,
                    '" rx="150" /> <path fill="none" stroke="#ffffff" stroke-width="20" stroke-linecap="round" d="M ',
                    uint2str(plant.x + plant.width - 150),
                    " ",
                    uint2str(plant.y + plant.height - 50),
                    " A 100 100 0 0 0 ",
                    uint2str(plant.x + plant.width - 50),
                    " ",
                    uint2str(plant.y + plant.height - 150),
                    '" />'
                )
            );
    }

    // SVG code for a single line
    function generateLineSvg(uint lineNumber, uint randomSeed)
        internal
        view
        returns (string memory)
    {
        // Line SVG
        string memory lineSvg = "";

        uint y = 150; // Default y for row 1
        if (lineNumber == 2) {
            y = 475; // Default y for row 2
        } else if (lineNumber == 3) {
            y = 800; // Default y for row 3
        }

        // Size of plant at slot 1
        uint plantSize1 = drawPlantSize(3, randomSeed);
        console.log("plant size 1: ", plantSize1);

        // Plant size 1x? Paint 1x at slot 1
        if (plantSize1 == 1) {
            Plant memory plant1 = createBPlantStruct(150, y, 300, 300, randomSeed);
            lineSvg = string.concat(lineSvg, plantSvg(plant1));

            // Slot 2
            // Size of plant at slot 2
            uint plantSize2 = drawPlantSize(2, randomSeed >> 1);
            console.log("Plant size 2: ", plantSize2);

            // Plant size 1x? Paint 1x at slot 2 and 1x at slot 3
            if (plantSize2 == 1) {
                Plant memory plant2 = createBPlantStruct(
                    475,
                    y,
                    300,
                    300,
                    randomSeed >> 2
                );
                Plant memory plant3 = createBPlantStruct(
                    800,
                    y,
                    300,
                    300,
                    randomSeed >> 3
                );
                lineSvg = string.concat(
                    lineSvg,
                    plantSvg(plant2),
                    plantSvg(plant3)
                );

                // Plant size 2x? Paint 2x at slot 2
            } else if (plantSize2 == 2) {
                Plant memory plant2 = createBPlantStruct(
                    475,
                    y,
                    625,
                    300,
                    randomSeed >> 4
                );
                lineSvg = string.concat(lineSvg, plantSvg(plant2));
            }

            // Plant size 2x? Paint 2x at slot 1 and 1x at slot 3
        } else if (plantSize1 == 2) {
            Plant memory plant1 = createBPlantStruct(
                150,
                y,
                625,
                300,
                randomSeed >> 5
            );
            Plant memory plant3 = createBPlantStruct(
                800,
                y,
                300,
                300,
                randomSeed >> 6
            );
            lineSvg = string.concat(lineSvg, plantSvg(plant1), plantSvg(plant3));

            // Plant size 3x? Paint 3x at slot 1
        } else if (plantSize1 == 3) {
            Plant memory plant1 = createBPlantStruct(
                150,
                y,
                950,
                300,
                randomSeed >> 7
            );
            lineSvg = string.concat(lineSvg, plantSvg(plant1));
        }

        return lineSvg;
    }

    // Draw animated eyes
    function drawEyes(uint eyesLocation) internal pure returns (string memory) {
        // Bottom-right location by default
        uint y1 = 930;
        uint y2 = 980;

        if (eyesLocation == 1) {
            y1 = 280;
            y2 = 330;
        } else if (eyesLocation == 2) {
            y1 = 605;
            y2 = 655;
        } // Location 3 skipped because it's set up as default already, and only changed if location is 1 or 2

        return
            string(
                abi.encodePacked(
                    '<rect x="980" y="',
                    uint2str(y1),
                    '" width="30" height="30" fill="#ffffff" rx="15"><animate attributeType="XML" attributeName="fill" values="#ffffff00;#ffffff00;#ffffff00;#ffffff00;#ffffff00;#ffffff;#ffffff00;#ffffff00;#ffffff00;#ffffff00;" dur="10s" repeatCount="indefinite"/></rect><rect x="930" y="',
                    uint2str(y2),
                    '" width="30" height="30" fill="#ffffff" rx="15"><animate attributeType="XML" attributeName="fill" values="#ffffff00;#ffffff00;#ffffff00;#ffffff00;#ffffff00;#ffffff;#ffffff00;#ffffff00;#ffffff00;#ffffff00;" dur="10s" repeatCount="indefinite"/></rect>'
                )
            );
    }

     // Final SVG code for the NFT
    function generateFinalSvg(
        uint randomSeed1,
        uint randomSeed2,
        uint randomSeed3
    ) public view returns (string memory) {
        bytes memory backgroundCode = abi.encodePacked(
            '<rect width="1250" height="1250" fill="',
            backgroundColors(randomSeed1 % 7),
            '" />'
        );

        // Which line will contain the eyes
        uint eyesLocation = (randomSeed1 % 3) + 1;

        // SVG opening and closing tags, background color + 3 lines generated
        string memory finalSvg = string(
            abi.encodePacked(
                '<svg viewBox="0 0 1250 1250" xmlns="http://www.w3.org/2000/svg">',
                backgroundCode,
                generateLineSvg(1, randomSeed1),
                generateLineSvg(2, randomSeed2),
                generateLineSvg(3, randomSeed3),
                drawEyes(eyesLocation),
                "</svg>"
            )
        );

        console.log("Final Svg: ", string(finalSvg));
        return finalSvg;
    }


    

    // Generate token URI with all the SVG code, to be stored on-chain
    function tokenURI(uint tokenId)
        internal
        view
        returns (string memory)
    {
        // require(_exists(tokenId));
        AppStorage storage s = LibAppStorage.diamondStorage();
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name": "Plants of Art #',
                                uint2str(tokenId),
                                '", "description": "Plants of Art are an assortment of 111 fully on-chain, randomly generated, happy art plants", "attributes": "", "image":"data:image/svg+xml;base64,',
                                Base64.encode(bytes(s.tokenIdToSvg[tokenId])),
                                '"}'
                            )
                        )
                    )
                )
            );
    }

    // From: https://stackoverflow.com/a/65707309/11969592
    function uint2str(uint _i)
        internal
        pure
        returns (string memory _uintAsString)
    {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

   
}
