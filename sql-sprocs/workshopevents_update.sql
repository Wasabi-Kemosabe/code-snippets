USE [C60_LaPathways]
GO
/****** Object:  StoredProcedure [dbo].[WorkshopsEvents_Update]    Script Date: 11/8/2018 9:13:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[WorkshopsEvents_Update]
@Id int,
@Title nvarchar(200),
@Host nvarchar(200),
@Description nvarchar(4000),
@AddressId int,
@StartTime datetime2(7),
@EndTime datetime2(7),
@Url nvarchar(3000),
@ImageUrl nvarchar(3000),
@IsRegistered bit

AS

/*
exec WorkshopsEvents_Update @Id = 1
	,@Title = 'Los Angeles Taco Takeover'
	,@Host = 'Cannonball Productions'
	,@Description = "No one knows good food like you, LA. That's why we're bringing The Cuervo Tradicional Taco Takeover & Cocktail Competition."
	,@AddressId = '2'
	,@StartTime = '2018-09-15 13:00:00'
	,@EndTime = '2018-09-15 20:00:00'
	,@Url = 'https://www.eventbrite.com/e/los-angeles-taco-takeover-tickets-47872022508?aff=ebdssbcitybrowse'
	,@ImageUrl = 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F47267748%2F86410149381%2F1%2Foriginal.jpg'
	,@IsRegistered = 1
select * from WorkshopsEvents
*/

UPDATE [dbo].[WorkshopsEvents]
   SET [Title] = @Title
      ,[Host] = @Host
      ,[Description] = @Description
      ,[AddressId] = @AddressId
      ,[StartTime] = @StartTime
      ,[EndTime] = @EndTime
      ,[Url] = @Url
      ,[ImageUrl] = @ImageUrl
      ,[IsRegistered] = @IsRegistered
      ,[DateModified] = GETUTCDATE()
 WHERE Id = @Id
