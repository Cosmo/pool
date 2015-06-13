/*
 *  Copyright (c) 2014, Gini GmbH.
 *  All rights reserved.
 */
#import <CoreGraphics/CoreGraphics.h>


/** The possible detection states of a document */
typedef NS_ENUM(NSUInteger, GINIDocumentDetectionState) {
            /** The image processing can't detect a document */
            GINIDocumentDetectionStateNotDetected,

            /**
             * The image processing detected a document, but it is not good enough to capture an image (e.g. because the
             * document is too far away).
             */
            GINIDocumentDetectionStateNotCapturable,
    
            /** The image processing detected a document and it can capture an image. */
            GINIDocumentDetectionStateCapturable
};


/**
 * The corners of a document expressed as 4 coordinates.
 */
typedef struct documentCorners {
    CGPoint topLeft;
    CGPoint topRight;
    CGPoint bottomLeft;
    CGPoint bottomRight;
} DocumentCorners;
