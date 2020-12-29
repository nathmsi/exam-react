

module.exports.getCountShinyGoldBagContainInBag = async function (req, res) {
    try {
        let counterBag = 0
        let bagContainer = []
        req.data.forEach(
            bag => {
                bag.bagContain.forEach(
                    bagContainElement => {
                        if (bagContainElement.includes('shiny gold bag')) {
                            bagContainer.push(bag.name)
                        }
                    }
                )

            }
        )
        req.data.forEach(
            bag => {
                bag.bagContain.forEach(
                    bagContainElement => {
                        if (bagContainElement.includes('shiny gold bag') || bagContainer.includes(bagContainElement)) {
                            counterBag++
                        }
                    }
                )

            }
        )
        res.status(200).json({
            result: {
                count: counterBag,
                bagContainer,
                data: req.data,
            }
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            message: `error get list candidates`
        });
    }
};

module.exports.getCountContainInBag = async function (req, res) {
    try {
        let counterBag = 0
        req.data.forEach(
            bag => {
                bag.bagContain.forEach(
                    bagContainElement => {
                        if (bagContainElement.includes('shiny gold bag')) {
                            if (bagContainElement.match(/\d+/)[0]) {
                                counterBag = counterBag + Number(bagContainElement.match(/\d+/)[0])
                            }
                        }
                    }
                )

            }
        )
        res.status(200).json({
            result: {
                count: counterBag,
                data: req.data
            }
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            message: `error get list candidates`
        });
    }
};
