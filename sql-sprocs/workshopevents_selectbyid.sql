USE [C60_LaPathways]
GO
/****** Object:  StoredProcedure [dbo].[WorkshopsEvents_SelectById]    Script Date: 11/8/2018 9:12:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[WorkshopsEvents_SelectById]
@Id int

AS

/*
exec WorkshopsEvents_SelectById @Id = 4
*/

SELECT [Id]
      ,[Title]
      ,[Host]
      ,[Description]
      ,[AddressId]
      ,[StartTime]
      ,[EndTime]
      ,[Url]
      ,[ImageUrl]
      ,[IsRegistered]
      ,[DateCreated]
      ,[DateModified]
  FROM [dbo].[WorkshopsEvents]
  WHERE Id = @Id
