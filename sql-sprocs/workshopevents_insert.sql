USE [C60_LaPathways]
GO
/****** Object:  StoredProcedure [dbo].[WorkshopsEvents_Insert]    Script Date: 11/8/2018 9:09:56 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[WorkshopsEvents_Insert]
@Title nvarchar(200),
@Host nvarchar(200),
@Description nvarchar(4000),
@AddressId int,
@StartTime datetime2(7),
@EndTime datetime2(7),
@Url nvarchar(3000),
@ImageUrl nvarchar(3000),
@IsRegistered bit,
@Id int output

AS

/*
declare @CreatedId int
exec WorkshopsEvents_Insert
	@Title = 'Los Angeles Taco Takeover'
	,@Host = 'Cannonball Productions'
	,@Description = "No one knows good food like you, LA. That's why we're bringing The Cuervo Tradicional Taco Takeover & Cocktail Competition."
	,@AddressId = '1'
	,@StartTime = '2018-09-15 13:00:00'
	,@EndTime = '2018-09-15 20:00:00'
	,@Url = 'https://www.eventbrite.com/e/los-angeles-taco-takeover-tickets-47872022508?aff=ebdssbcitybrowse'
	,@ImageUrl = 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F47267748%2F86410149381%2F1%2Foriginal.jpg'
	,@IsRegistered = 1
	,@Id = @CreatedId output
select * from WorkshopsEvents
*/

INSERT INTO [dbo].[WorkshopsEvents]
           ([Title]
           ,[Host]
           ,[Description]
           ,[AddressId]
           ,[StartTime]
           ,[EndTime]
           ,[Url]
           ,[ImageUrl]
           ,[IsRegistered])
     VALUES
           (@Title
           ,@Host
           ,@Description
           ,@AddressId
           ,@StartTime
           ,@EndTime
           ,@Url
           ,@ImageUrl
           ,@IsRegistered)
SET @Id = SCOPE_IDENTITY()
