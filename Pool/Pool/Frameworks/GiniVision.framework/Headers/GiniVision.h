/*
 *  Copyright (c) 2014, Gini GmbH.
 *  All rights reserved.
 */

#import <UIKit/UIKit.h>

#import "GiniVisionVersion.h"
#import "GINILog.h"

/**
 * The type of a document.
 */
typedef NS_ENUM(NSUInteger, GINIDocumentType) {

    // An invoice (DIN A4).
    GINIDocumentTypeInvoice,

    // A German remittance slip (DIN A6).
    GINIDocumentTypeRemittance,

    // A document or an invoice (DIN A4) with an integrated remittance slip.
    GINIDocumentTypeIntegratedRemittance
};

@protocol GINIVisionUploadDelegate;

@protocol GiniVisionDelegate <NSObject>

/**
 * Will be called after a document has been captured with the document (cropped and enhanced) as
 * argument. The given documentType argument describes the type of the scanned document.
 *
 * The receiver should upload the document and inform the given upload delegate so the UI is updated
 * accordingly.
 */
- (void)didScan:(UIImage *)document
   documentType:(GINIDocumentType)docType
 uploadDelegate:(id <GINIVisionUploadDelegate>)delegate;

@optional
/**
 * Will be called after a document has been captured with the original (that means not enhanced and
 * not cropped) image as argument. Handy for debugging or analysis. It is not recommended to use this
 * feature in production.
 */
- (void)didScanOriginal:(UIImage *)image;

/**
 * Called after the image capturing UI has been dismissed. The given argument success indicates
 * whether the user has captured a document or has canceled the document capturing.
 */
- (void)didFinishCapturing:(BOOL)success;

@end


@protocol GINIVisionUploadDelegate <NSObject>

/**
 * Call this method during the upload of a document to update the activity indicator accordingly.
 */
- (void)didProgress:(float)totalProgress;

/**
 * Call this method after the upload of a document has been finished. It will make the photo
 * capturing UI disappear and return to the screen of your UI from which the image capturing was
 * started.
 */
- (void)didEndUpload;

@end


@interface GiniVision : NSObject

/**
 * Returns the version of the GiniVision Framework.
 *
 * @returns The GiniVision Framework version.
 */
+ (NSString *)giniVisionVersion;

/**
 * Set the log level for the GiniVision Framework. Setting the log level influences which messages appear on the
 * device's console.
 *
 * @param level The log level as defined in `GINILogLevel`.
 */
+ (void)setLogLevel:(GINILogLevel)level;

/**
 * The currently set log level for the GiniVision framework.
 */
+ (GINILogLevel)logLevel;


+ (void)captureImageWithViewController:(UIViewController *)viewController
                              delegate:(id <GiniVisionDelegate>)delegate;

@end
