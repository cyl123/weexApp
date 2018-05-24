//
//  YYGlobal.h
//  Yunya
//
//  Created by lou xinhua on 15/9/17.
//  Copyright (c) 2015年 com.yunya. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#define isOldPhone CGSizeEqualToSize(CGSizeMake(320, 480), [[UIScreen mainScreen] bounds].size)
#define isRetina4 (([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(640, 960), [[UIScreen mainScreen] currentMode].size) : NO) || CGSizeEqualToSize(CGSizeMake(640, 960), [[UIScreen mainScreen] bounds].size))
#define isRetina5 (([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(640, 1136), [[UIScreen mainScreen] currentMode].size) : NO) || CGSizeEqualToSize(CGSizeMake(640, 1136), [[UIScreen mainScreen] bounds].size))
#define isPad ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(768, 1024), [[UIScreen mainScreen] currentMode].size) : NO)
#define isRetinaPad ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(768*2, 1024*2), [[UIScreen mainScreen] currentMode].size) : NO)
#define isRetina6 (([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(750, 1334), [[UIScreen mainScreen] currentMode].size) : NO))
#define isRetina6plus (([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(1242, 2208), [[UIScreen mainScreen] currentMode].size) : NO) || ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(1125, 2001), [[UIScreen mainScreen] currentMode].size) : NO))
#define isRetinaX ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(1125, 2436), [[UIScreen mainScreen] currentMode].size) : NO)
#define IsIOS8 ([[[UIDevice currentDevice] systemVersion] floatValue] >= 8.0 ? YES : NO)

#define DEFAULT_NAV_HEIGHT      64

#define WHITE_BOARD_MODULE      1

#define MAIN_SCREEN_HEIGHT    [UIScreen mainScreen].bounds.size.height
#define MAIN_SCREEN_WIDTH    [UIScreen mainScreen].bounds.size.width

#define RGBACOLOR(R,G,B,A) [UIColor colorWithRed:(R)/255.0f green:(G)/255.0f blue:(B)/255.0f alpha:(A)]
#define UIColorFromRGB(rgbValue,alphaValue) [UIColor \
colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 \
green:((float)((rgbValue & 0xFF00) >> 8))/255.0 \
blue:((float)(rgbValue & 0xFF))/255.0 alpha:alphaValue]

#define USER_CORP_SAVE(CORP) [[NSUserDefaults standardUserDefaults] setObject:CORP forKey:K_USER_CORP]
#define GET_CORP              [[NSUserDefaults standardUserDefaults] objectForKey:K_USER_CORP]

#define USER_ZHENSUO_SAVE(CORP) [[NSUserDefaults standardUserDefaults] setObject:CORP forKey:K_USER_ZHENSUO]
#define GET_ZHENSUO              [[NSUserDefaults standardUserDefaults] objectForKey:K_USER_ZHENSUO]

#define USER_LOGINNAME_SAVE(CORP) [[NSUserDefaults standardUserDefaults] setObject:CORP forKey:K_USER_LOGGINNAME]
#define GET_LOGINNAME              [[NSUserDefaults standardUserDefaults] objectForKey:K_USER_LOGGINNAME]

#pragma mark - Frame (宏 x, y, width, height)

//按设备宽度做适配  以5s为基准画的图
//#define SCALE_WIDTH(x) (([UIScreen mainScreen].bounds.size.width/320.0)*(x))

//以设备6画的图
#define SCALE_WIDTH(x) (([UIScreen mainScreen].bounds.size.width/375.0)*(x))

#define SCREEN_WIDTH    [UIScreen mainScreen].bounds.size.width
#define SCREEN_HEIGHT   [UIScreen mainScreen].bounds.size.height

// App Frame
#define Application_Frame       [[UIScreen mainScreen] applicationFrame]

// View 坐标(x,y)和宽高(width,height)
#define X(v)                    (v).frame.origin.x
#define Y(v)                    (v).frame.origin.y
#define WIDTH(v)                (v).frame.size.width
#define HEIGHT(v)               (v).frame.size.height

#define MinX(v)                 CGRectGetMinX((v).frame)
#define MinY(v)                 CGRectGetMinY((v).frame)

#define MidX(v)                 CGRectGetMidX((v).frame)
#define MidY(v)                 CGRectGetMidY((v).frame)

#define MaxX(v)                 CGRectGetMaxX((v).frame)
#define MaxY(v)                 CGRectGetMaxY((v).frame)

#define RECT_CHANGE_x(v,x)          CGRectMake(x, Y(v), WIDTH(v), HEIGHT(v))
#define RECT_CHANGE_y(v,y)          CGRectMake(X(v), y, WIDTH(v), HEIGHT(v))
#define RECT_CHANGE_point(v,x,y)    CGRectMake(x, y, WIDTH(v), HEIGHT(v))
#define RECT_CHANGE_width(v,w)      CGRectMake(X(v), Y(v), w, HEIGHT(v))
#define RECT_CHANGE_height(v,h)     CGRectMake(X(v), Y(v), WIDTH(v), h)
#define RECT_CHANGE_size(v,w,h)     CGRectMake(X(v), Y(v), w, h)

// 系统控件默认高度
#define kStatusBarHeight      (isRetinaX ? 44.f : 20.f)
#define kTopBarHeight         (44.f)
#define kBottomBarHeight      (isRetinaX ? 83.f : 49.f)

#define kCellDefaultHeight      (44.f)

#define kEnglishKeyboardHeight  (216.f)
#define kChineseKeyboardHeight  (252.f)

//TopBar 第一个按钮起始x位置
#define kTopBarItemStartSpacing (5)
//TopBar 按钮上间隙
#define kTopBarItemSpacing (15)

#pragma mark - Funtion Method (宏 方法)

//** 沙盒路径
#define PATH_OF_APP_HOME    NSHomeDirectory()
#define PATH_OF_TEMP        NSTemporaryDirectory()
#define PATH_OF_DOCUMENT    [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0]

#pragma mark -  字体大小(常规/粗体)

#define BOLDSYSTEMFONT(FONTSIZE)[UIFont boldSystemFontOfSize:FONTSIZE]
#define SYSTEMFONT(FONTSIZE)    [UIFont systemFontOfSize:FONTSIZE]
#define FONT(NAME, FONTSIZE)    [UIFont fontWithName:(NAME) size:(FONTSIZE)]

#define YS_Color         UIColorFromRGB(0x0090E2,1)
#define YS_LineColor     UIColorFromRGB(0xF7F7F7,1)
#define YS_No_LineColor  UIColorFromRGB(0xE2E2E2,1)

typedef void(^YYCallback)(id result);

@class YYError;

@interface YYGlobal : NSObject


@end

