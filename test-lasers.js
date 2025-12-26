// 레이저 경로 시뮬레이션 테스트 스크립트

// 행성 배치 데이터
const questionerBoard = [
    [
        null, null, null,
        { type: "small-red", size: "small", color: "#e74c3c", shape: "circle", reflective: true, width: 1, height: 1, isOrigin: true, originRow: 0, originCol: 3, rotation: 0 },
        null, null, null, null, null, null, null
    ],
    [
        null, null,
        { type: "small-blue", size: "small", color: "#3498db", shape: "diamond", reflective: true, width: 2, height: 2, isOrigin: true, originRow: 1, originCol: 2, rotation: 0 },
        { type: "small-blue", size: "small", color: "#3498db", shape: "diamond", reflective: true, width: 2, height: 2, isOrigin: false, originRow: 1, originCol: 2, rotation: 0 },
        null, null, null, null,
        { type: "black-hole", size: "small", color: "#000000", shape: "circle", reflective: false, refractive: true, absorptive: true, width: 1, height: 1, isOrigin: true, originRow: 1, originCol: 8, rotation: 0 },
        null, null
    ],
    [
        null, null,
        { type: "small-blue", size: "small", color: "#3498db", shape: "diamond", reflective: true, width: 2, height: 2, isOrigin: false, originRow: 1, originCol: 2, rotation: 0 },
        { type: "small-blue", size: "small", color: "#3498db", shape: "diamond", reflective: true, width: 2, height: 2, isOrigin: false, originRow: 1, originCol: 2, rotation: 0 },
        null,
        { type: "small-orange", size: "small", color: "#e74c3c", shape: "diamond", reflective: true, width: 2, height: 2, isOrigin: true, originRow: 2, originCol: 5, rotation: 0 },
        { type: "small-orange", size: "small", color: "#e74c3c", shape: "diamond", reflective: true, width: 2, height: 2, isOrigin: false, originRow: 2, originCol: 5, rotation: 0 },
        null, null,
        { type: "medium-jupiter", size: "medium", color: "#ecf0f1", shape: "trapezoid", reflective: true, width: 4, height: 2, isOrigin: true, originRow: 2, originCol: 9, rotation: 90 },
        { type: "medium-jupiter", size: "medium", color: "#ecf0f1", shape: "trapezoid", reflective: true, width: 4, height: 2, isOrigin: false, originRow: 2, originCol: 9, rotation: 90 }
    ],
    [
        null,
        { type: "medium-earth", size: "medium", color: "#f1c40f", shape: "octagon", reflective: true, width: 3, height: 3, isOrigin: true, originRow: 3, originCol: 1, rotation: 0 },
        { type: "medium-earth", size: "medium", color: "#f1c40f", shape: "octagon", reflective: true, width: 3, height: 3, isOrigin: false, originRow: 3, originCol: 1, rotation: 0 },
        { type: "medium-earth", size: "medium", color: "#f1c40f", shape: "octagon", reflective: true, width: 3, height: 3, isOrigin: false, originRow: 3, originCol: 1, rotation: 0 },
        null,
        { type: "small-orange", size: "small", color: "#e74c3c", shape: "diamond", reflective: true, width: 2, height: 2, isOrigin: false, originRow: 2, originCol: 5, rotation: 0 },
        { type: "small-orange", size: "small", color: "#e74c3c", shape: "diamond", reflective: true, width: 2, height: 2, isOrigin: false, originRow: 2, originCol: 5, rotation: 0 },
        { type: "large-saturn", size: "large", color: "#ecf0f1", shape: "ring", reflective: true, width: 4, height: 2, hasRing: true, isOrigin: true, originRow: 3, originCol: 7, rotation: 90 },
        { type: "large-saturn", size: "large", color: "#ecf0f1", shape: "ring", reflective: true, width: 4, height: 2, hasRing: true, isOrigin: false, originRow: 3, originCol: 7, rotation: 90 },
        { type: "medium-jupiter", size: "medium", color: "#ecf0f1", shape: "trapezoid", reflective: true, width: 4, height: 2, isOrigin: false, originRow: 2, originCol: 9, rotation: 90 },
        { type: "medium-jupiter", size: "medium", color: "#ecf0f1", shape: "trapezoid", reflective: true, width: 4, height: 2, isOrigin: false, originRow: 2, originCol: 9, rotation: 90 }
    ],
    [
        null,
        { type: "medium-earth", size: "medium", color: "#f1c40f", shape: "octagon", reflective: true, width: 3, height: 3, isOrigin: false, originRow: 3, originCol: 1, rotation: 0 },
        { type: "medium-earth", size: "medium", color: "#f1c40f", shape: "octagon", reflective: true, width: 3, height: 3, isOrigin: false, originRow: 3, originCol: 1, rotation: 0 },
        { type: "medium-earth", size: "medium", color: "#f1c40f", shape: "octagon", reflective: true, width: 3, height: 3, isOrigin: false, originRow: 3, originCol: 1, rotation: 0 },
        null, null, null,
        { type: "large-saturn", size: "large", color: "#ecf0f1", shape: "ring", reflective: true, width: 4, height: 2, hasRing: true, isOrigin: false, originRow: 3, originCol: 7, rotation: 90 },
        { type: "large-saturn", size: "large", color: "#ecf0f1", shape: "ring", reflective: true, width: 4, height: 2, hasRing: true, isOrigin: false, originRow: 3, originCol: 7, rotation: 90 },
        { type: "medium-jupiter", size: "medium", color: "#ecf0f1", shape: "trapezoid", reflective: true, width: 4, height: 2, isOrigin: false, originRow: 2, originCol: 9, rotation: 90 },
        { type: "medium-jupiter", size: "medium", color: "#ecf0f1", shape: "trapezoid", reflective: true, width: 4, height: 2, isOrigin: false, originRow: 2, originCol: 9, rotation: 90 }
    ],
    [
        null,
        { type: "medium-earth", size: "medium", color: "#f1c40f", shape: "octagon", reflective: true, width: 3, height: 3, isOrigin: false, originRow: 3, originCol: 1, rotation: 0 },
        { type: "medium-earth", size: "medium", color: "#f1c40f", shape: "octagon", reflective: true, width: 3, height: 3, isOrigin: false, originRow: 3, originCol: 1, rotation: 0 },
        { type: "medium-earth", size: "medium", color: "#f1c40f", shape: "octagon", reflective: true, width: 3, height: 3, isOrigin: false, originRow: 3, originCol: 1, rotation: 0 },
        null, null, null,
        { type: "large-saturn", size: "large", color: "#ecf0f1", shape: "ring", reflective: true, width: 4, height: 2, hasRing: true, isOrigin: false, originRow: 3, originCol: 7, rotation: 90 },
        { type: "large-saturn", size: "large", color: "#ecf0f1", shape: "ring", reflective: true, width: 4, height: 2, hasRing: true, isOrigin: false, originRow: 3, originCol: 7, rotation: 90 },
        { type: "medium-jupiter", size: "medium", color: "#ecf0f1", shape: "trapezoid", reflective: true, width: 4, height: 2, isOrigin: false, originRow: 2, originCol: 9, rotation: 90 },
        { type: "medium-jupiter", size: "medium", color: "#ecf0f1", shape: "trapezoid", reflective: true, width: 4, height: 2, isOrigin: false, originRow: 2, originCol: 9, rotation: 90 }
    ],
    [
        null, null, null, null, null, null, null,
        { type: "large-saturn", size: "large", color: "#ecf0f1", shape: "ring", reflective: true, width: 4, height: 2, hasRing: true, isOrigin: false, originRow: 3, originCol: 7, rotation: 90 },
        { type: "large-saturn", size: "large", color: "#ecf0f1", shape: "ring", reflective: true, width: 4, height: 2, hasRing: true, isOrigin: false, originRow: 3, originCol: 7, rotation: 90 },
        null, null
    ]
];

// 색상 매핑
function getPlanetBaseColor(hexColor) {
    const colorMap = {
        '#e74c3c': 'red',
        '#3498db': 'blue',
        '#f1c40f': 'yellow',
        '#ecf0f1': 'white',
        '#000000': 'black'
    };
    return colorMap[hexColor] || 'none';
}

// 색상 혼합
const COLOR_MIXING = {
    'blue+red': 'purple',
    'blue+yellow': 'green',
    'red+yellow': 'orange',
    'red+white': 'pink',
    'blue+white': 'skyblue',
    'white+yellow': 'lemon',
    'blue+red+yellow': 'black',
    'blue+red+white': 'lightpurple',
    'red+white+yellow': 'lightorange',
    'blue+white+yellow': 'lightgreen',
    'blue+red+white+yellow': 'gray',
    'black+white': 'gray'
};

function mixColorsArray(colors) {
    if (colors.length === 0) return 'none';
    const uniqueColors = [...new Set(colors)].filter(c => c !== 'none');
    if (uniqueColors.length === 0) return 'none';
    if (uniqueColors.length === 1) return uniqueColors[0];
    const sortedColors = uniqueColors.sort();
    const key = sortedColors.join('+');
    return COLOR_MIXING[key] || 'mixed';
}

// 위치 ID 파싱
function parsePositionId(positionId) {
    if (positionId >= 1 && positionId <= 11) {
        return { direction: 'top', row: -1, col: positionId - 1 };
    }
    if (positionId >= 12 && positionId <= 18) {
        return { direction: 'right', row: positionId - 12, col: 11 };
    }
    const charCode = typeof positionId === 'string' ? positionId.charCodeAt(0) : null;
    if (charCode >= 65 && charCode <= 71) {
        return { direction: 'left', row: charCode - 65, col: -1 };
    }
    if (charCode >= 72 && charCode <= 82) {
        return { direction: 'bottom', row: 7, col: charCode - 72 };
    }
    return null;
}

// 출구 라벨
function getPositionLabel(direction, row, col) {
    if (direction === 'top' && row === 0 && col >= 0 && col <= 10) {
        return (col + 1).toString();
    }
    if (direction === 'right' && col === 10 && row >= 0 && row <= 6) {
        return (row + 12).toString();
    }
    if (direction === 'left' && col === 0 && row >= 0 && row <= 6) {
        return String.fromCharCode(65 + row);
    }
    if (direction === 'bottom' && row === 6 && col >= 0 && col <= 10) {
        return String.fromCharCode(72 + col);
    }
    return null;
}

// 대각선 블랙홀 체크
function checkDiagonalBlackHole(row, col) {
    const diagonalDirections = [
        { row: row - 1, col: col - 1, dir: 'top-left' },
        { row: row - 1, col: col + 1, dir: 'top-right' },
        { row: row + 1, col: col - 1, dir: 'bottom-left' },
        { row: row + 1, col: col + 1, dir: 'bottom-right' }
    ];
    for (const adj of diagonalDirections) {
        if (adj.row >= 0 && adj.row <= 6 && adj.col >= 0 && adj.col <= 10) {
            const cell = questionerBoard[adj.row][adj.col];
            if (cell && cell.type === 'black-hole') {
                return { row: adj.row, col: adj.col, direction: adj.dir };
            }
        }
    }
    return null;
}

// 블랙홀 굴절
function bendTowardBlackHole(dirRow, dirCol, blackHolePos, currentRow, currentCol) {
    const rowDiff = blackHolePos.row - currentRow;
    const colDiff = blackHolePos.col - currentCol;
    if (dirRow === 0) {
        if (rowDiff > 0) return { dirRow: 1, dirCol: 0 };
        else if (rowDiff < 0) return { dirRow: -1, dirCol: 0 };
        else return { dirRow, dirCol };
    }
    if (dirCol === 0) {
        if (colDiff > 0) return { dirRow: 0, dirCol: 1 };
        else if (colDiff < 0) return { dirRow: 0, dirCol: -1 };
        else return { dirRow, dirCol };
    }
    return { dirRow, dirCol };
}

// 반사 계산
function calculateReflection(dirRow, dirCol, shape, currentRow, currentCol, originRow, originCol, planetWidth, planetHeight, rotation) {
    const relRow = currentRow - originRow;
    const relCol = currentCol - originCol;

    if (shape === 'diamond') {
        if (dirRow === 0 && dirCol !== 0) {
            if (relRow === 0) return { dirRow: -1, dirCol: 0 };
            else return { dirRow: 1, dirCol: 0 };
        }
        else if (dirRow !== 0 && dirCol === 0) {
            if (relCol === 0) return { dirRow: 0, dirCol: -1 };
            else return { dirRow: 0, dirCol: 1 };
        }
        return { dirRow: -dirRow, dirCol: -dirCol };
    }
    else if (shape === 'octagon') {
        const isCenterRow = relRow === 1;
        const isCenterCol = relCol === 1;
        if (dirRow === 0 && dirCol !== 0) {
            if (isCenterRow) return { dirRow: -dirRow, dirCol: -dirCol };
            else return { dirRow: relRow === 0 ? -1 : 1, dirCol: 0 };
        }
        else if (dirRow !== 0 && dirCol === 0) {
            if (isCenterCol) return { dirRow: -dirRow, dirCol: -dirCol };
            else return { dirRow: 0, dirCol: relCol === 0 ? -1 : 1 };
        }
        return { dirRow: -dirRow, dirCol: -dirCol };
    }
    else if (shape === 'trapezoid') {
        rotation = rotation || 0;
        if (rotation === 90) {
            // 세로 배치 (2x4): 밑변이 오른쪽
            // 왼쪽에서 진입
            if (dirCol > 0 && dirRow === 0) {
                if (relRow === 0 || relRow === 3) {
                    return { dirRow: relRow === 0 ? -1 : 1, dirCol: 0 };
                } else {
                    return { dirRow: -dirRow, dirCol: -dirCol };
                }
            }
            // 오른쪽에서 진입
            else if (dirCol < 0 && dirRow === 0) {
                if (relRow === 0 || relRow === 3) {
                    return { dirRow: relRow === 0 ? -1 : 1, dirCol: 0 };
                } else {
                    return { dirRow: -dirRow, dirCol: -dirCol };
                }
            }
            // 위에서 진입
            else if (dirRow > 0 && dirCol === 0) {
                if (relCol === 0) {
                    return { dirRow: 0, dirCol: -1 };
                } else {
                    return { dirRow: 0, dirCol: 1 };
                }
            }
            // 아래에서 진입
            else if (dirRow < 0 && dirCol === 0) {
                if (relCol === 0) {
                    return { dirRow: 0, dirCol: -1 };
                } else {
                    return { dirRow: 0, dirCol: 1 };
                }
            }
        }
        else if (rotation === 270) {
            // 세로 배치 역방향 (2x4): 밑변이 왼쪽
            if (dirCol > 0 && dirRow === 0) {
                if (relRow === 0 || relRow === 3) {
                    return { dirRow: relRow === 0 ? -1 : 1, dirCol: 0 };
                } else {
                    return { dirRow: -dirRow, dirCol: -dirCol };
                }
            }
            else if (dirCol < 0 && dirRow === 0) {
                if (relRow === 0 || relRow === 3) {
                    return { dirRow: relRow === 0 ? -1 : 1, dirCol: 0 };
                } else {
                    return { dirRow: -dirRow, dirCol: -dirCol };
                }
            }
            else if (dirRow > 0 && dirCol === 0) {
                if (relCol === 1) {
                    return { dirRow: 0, dirCol: 1 };
                } else {
                    return { dirRow: 0, dirCol: -1 };
                }
            }
            else if (dirRow < 0 && dirCol === 0) {
                if (relCol === 1) {
                    return { dirRow: 0, dirCol: 1 };
                } else {
                    return { dirRow: 0, dirCol: -1 };
                }
            }
        }
        return { dirRow: -dirRow, dirCol: -dirCol };
    }
    else if (shape === 'ring') {
        rotation = rotation || 0;
        if (rotation === 90 || rotation === 270) {
            const isTopLine = (relRow === 0);
            const isBottomLine = (relRow === 3);
            const isDiamond = (relRow === 1 || relRow === 2);
            if (dirRow !== 0 && dirCol === 0) {
                if (isTopLine || isBottomLine) {
                    return { dirRow: -dirRow, dirCol: -dirCol };
                } else {
                    return { dirRow: 0, dirCol: relCol === 0 ? -1 : 1 };
                }
            }
            else if (dirRow === 0 && dirCol !== 0) {
                if (isDiamond) {
                    return { dirRow: relRow === 1 ? -1 : 1, dirCol: 0 };
                }
            }
        }
        return { dirRow: -dirRow, dirCol: -dirCol };
    }
    return { dirRow: -dirRow, dirCol: -dirCol };
}

// 레이저 경로 계산
function calculateLaserPath(direction, startRow, startCol) {
    let currentRow = startRow;
    let currentCol = startCol;
    let dirRow, dirCol;

    switch(direction) {
        case 'top': dirRow = 1; dirCol = 0; break;
        case 'bottom': dirRow = -1; dirCol = 0; break;
        case 'left': dirRow = 0; dirCol = 1; break;
        case 'right': dirRow = 0; dirCol = -1; break;
    }

    let collectedColors = [];
    let path = [];
    let maxSteps = 100;
    let steps = 0;
    let lastHitCell = null;
    let hasRefracted = false;

    path.push({ row: currentRow, col: currentCol, color: 'none', type: 'entry' });

    while (steps < maxSteps) {
        currentRow += dirRow;
        currentCol += dirCol;

        if (currentRow < 0 || currentRow > 6 || currentCol < 0 || currentCol > 10) {
            let actualExitDirection;
            if (currentRow < 0) actualExitDirection = 'top';
            else if (currentRow > 6) actualExitDirection = 'bottom';
            else if (currentCol < 0) actualExitDirection = 'left';
            else if (currentCol > 10) actualExitDirection = 'right';

            const finalColor = mixColorsArray(collectedColors);
            path.push({
                row: currentRow - dirRow,
                col: currentCol - dirCol,
                color: finalColor,
                type: 'exit',
                exitDirection: actualExitDirection
            });
            break;
        }

        const planet = questionerBoard[currentRow][currentCol];

        if (planet && planet.type === 'black-hole') {
            path.push({ row: currentRow, col: currentCol, color: 'black', type: 'black-hole-hit' });
            return { path, exitColor: null, exitPosition: null, exitDirection: null, status: 'disappeared' };
        }

        if (planet) {
            if (planet.hasRing) {
                const rotation = planet.rotation || 0;
                const relRow = currentRow - planet.originRow;
                const relCol = currentCol - planet.originCol;
                let shouldPass = false;
                if (rotation === 0 || rotation === 180) {
                    const isLine = (relCol === 0 || relCol === 3);
                    const isHorizontal = (dirRow === 0 && dirCol !== 0);
                    if (isLine && isHorizontal) shouldPass = true;
                } else if (rotation === 90 || rotation === 270) {
                    const isLine = (relRow === 0 || relRow === 3);
                    const isVertical = (dirRow !== 0 && dirCol === 0);
                    if (isLine && isVertical) shouldPass = true;
                }
                if (shouldPass) {
                    const currentMixedColor = mixColorsArray(collectedColors);
                    path.push({ row: currentRow, col: currentCol, color: currentMixedColor, type: 'pass-ring' });
                    steps++;
                    continue;
                }
            }

            const currentCellKey = `${currentRow},${currentCol}`;
            if (currentCellKey === lastHitCell) {
                const currentMixedColor = mixColorsArray(collectedColors);
                path.push({ row: currentRow, col: currentCol, color: currentMixedColor, type: 'pass' });
                steps++;
                continue;
            }

            // 새로운 행성과 충돌 - 이전 행성 반사 상태 초기화
            lastHitCell = null;

            const planetColor = getPlanetBaseColor(planet.color);
            if (planetColor !== 'none') {
                collectedColors.push(planetColor);
            }

            const currentMixedColor = mixColorsArray(collectedColors);
            path.push({ row: currentRow, col: currentCol, color: currentMixedColor, type: 'hit', planet: planet });

            if (planet.reflective) {
                const reflection = calculateReflection(dirRow, dirCol, planet.shape, currentRow, currentCol,
                    planet.originRow, planet.originCol, planet.width, planet.height, planet.rotation || 0);
                dirRow = reflection.dirRow;
                dirCol = reflection.dirCol;
                lastHitCell = currentCellKey;
            } else {
                const finalColor = mixColorsArray(collectedColors);
                path.push({ row: currentRow, col: currentCol, color: finalColor, type: 'blocked' });
                return { path, exitColor: null, exitPosition: null, exitDirection: null, status: 'blocked' };
            }
        } else {
            const currentMixedColor = mixColorsArray(collectedColors);
            path.push({ row: currentRow, col: currentCol, color: currentMixedColor, type: 'pass' });

            // 블랙홀 대각선 굴절 체크 (한 번만, 행성 반사 직후 첫 칸이 아닐 때, 그리고 진입 후 최소 1칸 이동 후)
            if (!hasRefracted && lastHitCell === null && steps >= 1) {
                const diagonalBlackHole = checkDiagonalBlackHole(currentRow, currentCol);
                if (diagonalBlackHole) {
                    const newDirection = bendTowardBlackHole(dirRow, dirCol, diagonalBlackHole, currentRow, currentCol);
                    dirRow = newDirection.dirRow;
                    dirCol = newDirection.dirCol;
                    hasRefracted = true;
                    path[path.length - 1].type = 'refract';
                }
            }
            // lastHitCell은 다음 행성을 만날 때까지 유지 (빈 공간에서 초기화하지 않음)
        }
        steps++;
    }

    if (steps >= maxSteps) {
        return { path, exitColor: null, exitPosition: null, exitDirection: null, status: 'trapped' };
    }

    const exitPoint = path[path.length - 1];
    const finalColor = mixColorsArray(collectedColors);
    return {
        path,
        exitColor: finalColor,
        exitPosition: exitPoint.type === 'exit' ? { row: exitPoint.row, col: exitPoint.col } : null,
        exitDirection: exitPoint.exitDirection || null,
        status: 'exit'
    };
}

// 색상 한글 변환
function getColorNameKorean(color) {
    const koreanNames = {
        'none': '무색', 'red': '빨강', 'blue': '파랑', 'yellow': '노랑', 'white': '흰',
        'purple': '보라', 'green': '초록', 'orange': '주황', 'pink': '분홍',
        'skyblue': '하늘', 'lemon': '레몬', 'black': '검정',
        'lightpurple': '연보라', 'lightorange': '연주황', 'lightgreen': '연초록', 'gray': '회색'
    };
    return koreanNames[color] || color;
}

// 전체 테스트 실행
console.log('🧪 디버그: 전체 레이저 테스트 (36가지)\n');
console.log('='.repeat(80));

const allTests = [];

// A-R (18개)
for (let i = 0; i < 18; i++) {
    const position = String.fromCharCode(65 + i);
    const posData = parsePositionId(position);
    if (posData) {
        const result = calculateLaserPath(posData.direction, posData.row, posData.col);
        allTests.push({ position, result });
    }
}

// 1-18 (18개)
for (let i = 1; i <= 18; i++) {
    const position = i;
    const posData = parsePositionId(position);
    if (posData) {
        const result = calculateLaserPath(posData.direction, posData.row, posData.col);
        allTests.push({ position, result });
    }
}

// 결과 출력
allTests.forEach(({ position, result }) => {
    let output = '';

    if (result.status === 'blocked') {
        output = '→ 차단됨';
    } else if (result.status === 'disappeared') {
        output = '→ 소멸 (블랙홀) 🕳️';
    } else if (result.status === 'trapped') {
        output = '→ 포획 (블랙홀) ⚠️';
    } else {
        const exitPoint = result.path[result.path.length - 1];
        const exitLabel = getPositionLabel(result.exitDirection, exitPoint.row, exitPoint.col);
        const exitColorKorean = getColorNameKorean(result.exitColor);
        output = `→ ${exitLabel}번 ${exitColorKorean}`;
    }

    // 경로 설명
    const pathDescription = [];
    const planetsHit = [];

    for (let i = 0; i < result.path.length; i++) {
        const step = result.path[i];
        if (step.type === 'hit' && step.planet) {
            const planetColor = getPlanetBaseColor(step.planet.color);
            const planetShape = step.planet.shape;
            const planetColorKorean = getColorNameKorean(planetColor);
            const planetKey = `${step.planet.originRow},${step.planet.originCol}`;

            if (!planetsHit.includes(planetKey)) {
                planetsHit.push(planetKey);
                const shapeKorean = {
                    'circle': '원형', 'diamond': '마름모', 'octagon': '팔각형',
                    'trapezoid': '사다리꼴', 'ring': '링'
                }[planetShape] || planetShape;

                const reflectionType = step.planet.reflective ?
                    (planetShape === 'circle' ? '180도 반사' :
                     planetShape === 'diamond' ? '90도 반사' :
                     planetShape === 'octagon' ? '반사' :
                     planetShape === 'trapezoid' ? '반사' :
                     planetShape === 'ring' ? '반사' : '반사') : '차단';

                pathDescription.push(`(${step.row},${step.col})에서 ${planetColorKorean} ${shapeKorean} 만남 → ${reflectionType}`);
            }
        } else if (step.type === 'refract') {
            pathDescription.push(`(${step.row},${step.col})에서 블랙홀 굴절 🕳️ → 90도 방향 변경`);
        } else if (step.type === 'black-hole-hit') {
            pathDescription.push(`(${step.row},${step.col})에서 블랙홀 직접 충돌 💥 → 소멸`);
        }
    }

    const description = pathDescription.length > 0 ? pathDescription.join(' → ') : '행성과 충돌하지 않고 통과';

    console.log(`\n${position}번 입력`);
    console.log(`${output}`);
    if (result.status !== 'blocked' && result.status !== 'disappeared' && result.status !== 'trapped') {
        console.log(description);
    }
});

console.log('\n' + '='.repeat(80));
console.log(`총 ${allTests.length}개 테스트 완료`);
