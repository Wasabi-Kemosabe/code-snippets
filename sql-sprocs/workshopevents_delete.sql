USE [C60_LaPathways]
GO
/****** Object:  StoredProcedure [dbo].[WorkshopsEvents_Delete]    Script Date: 11/7/2018 1:29:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[WorkshopsEvents_Delete]
@Id int

AS

/*
exec WorkshopsEvents_Delete @Id = 5
*/

DELETE FROM [dbo].[WorkshopsEvents]
      WHERE Id = @Id
