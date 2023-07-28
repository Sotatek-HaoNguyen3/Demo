import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import type { Frame } from 'react-native-vision-camera/src';
import { BarcodeFormat } from 'vision-camera-code-scanner';
import type { Barcode, CodeScannerOptions } from 'vision-camera-code-scanner';

interface Props {
    children: React.ReactNode;
    torch: boolean;
}

export const Scanner: FunctionComponent<Props> = ({ children, torch }) => {
    const devices = useCameraDevices();
    const device = devices.back;
    const camera = useRef<Camera>(null);
    const [barcodes, setBc] = useState<Barcode[]>([]);

    function scanBarcodes(frame: Frame, types: BarcodeFormat[], options?: CodeScannerOptions): Barcode[] {
        'worklet';
        // @ts-ignore
        // eslint-disable-next-line no-undef
        return __scanCodes(frame, types, options);
    }

    const frameProcessor = useFrameProcessor((frame) => {
        'worklet';
        const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
        runOnJS(setBc)(detectedBarcodes);
    }, []);

    const [hasPerms, setPerms] = React.useState(false);
    const [permsGotten, setPermsGotten] = React.useState(false);

    const requestPermissions = useCallback(async () => {
        const permission = await Camera.requestCameraPermission();
        setPerms(permission === 'authorized');
        setPermsGotten(true);
    }, []);

    useEffect(() => {
        void requestPermissions();
    }, [requestPermissions]);

    if (!permsGotten) {
        return <Text>loading</Text>;
    }
    if (device === undefined || !hasPerms) {
        return <Text>no perms</Text>;
    }
    return (
        <>
            <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                torch={torch ? 'on' : 'off'}
                frameProcessor={frameProcessor}
                frameProcessorFps={5}>
                {children}
            </Camera>
            {barcodes.map((barcode, idx) => (
                <Text key={idx} style={styles.barcodeTextURL}>
                    {barcode.displayValue}
                </Text>
            ))}
        </>
    );
};

const styles = StyleSheet.create({
    barcodeTextURL: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
});
