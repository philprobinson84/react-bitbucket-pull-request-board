import React from 'react'
import { Box, Layer, Button } from 'grommet'
import { FaBitbucket } from 'react-icons/fa'
import getEnv from '../env'


export default function BitbucketLink() {
    return (
        <Layer>
            <Box
                pad='small'
                flex='shrink'
            >
                <Button
                    icon={<FaBitbucket color='navy' />}
                    label='Connect to Bitbucket'
                    onClick={() => window.open(getEnv().bitbucket.oauthUrl)}
                />
            </Box>
        </Layer>
    )
}
