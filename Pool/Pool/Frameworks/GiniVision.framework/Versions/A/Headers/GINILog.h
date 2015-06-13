#import <Foundation/Foundation.h>


typedef NS_ENUM(NSInteger, GINILogLevel) {
    /** The GiniVision framework will log no messages to the console. */
    GINILogLevelNone,
    /** The GiniVision framework will log debug messages to the console. */
    GINILogLevelDebug
};


void GINI_LOG_DEBUG(NSString *format, ...) NS_FORMAT_FUNCTION(1,2);
