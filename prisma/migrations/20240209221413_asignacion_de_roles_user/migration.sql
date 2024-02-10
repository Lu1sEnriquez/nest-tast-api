BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[sysdiagrams] (
    [name] NVARCHAR(128) NOT NULL,
    [principal_id] INT NOT NULL,
    [diagram_id] INT NOT NULL IDENTITY(1,1),
    [version] INT,
    [definition] VARBINARY(max),
    CONSTRAINT [PK__sysdiagr__C2B05B618B8234C3] PRIMARY KEY CLUSTERED ([diagram_id]),
    CONSTRAINT [UK_principal_name] UNIQUE NONCLUSTERED ([principal_id],[name])
);

-- CreateTable
CREATE TABLE [dbo].[Task] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(255) NOT NULL,
    [description] NVARCHAR(max),
    [complete] BIT NOT NULL CONSTRAINT [DF__Task__complete__74AE54BC] DEFAULT 0,
    [creationDate] DATETIME NOT NULL CONSTRAINT [DF__Task__creationDa__75A278F5] DEFAULT CURRENT_TIMESTAMP,
    [completionDate] DATE,
    [userId] INT NOT NULL,
    CONSTRAINT [PK__Task__3213E83F14B93BD4] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [firstName] NVARCHAR(255) NOT NULL,
    [lastName] NVARCHAR(255) NOT NULL,
    [email] NVARCHAR(max) NOT NULL,
    [password] NVARCHAR(255) NOT NULL,
    [creationDate] DATETIME NOT NULL CONSTRAINT [DF__User__creationDa__71D1E811] DEFAULT CURRENT_TIMESTAMP,
    [role] NVARCHAR(255) NOT NULL CONSTRAINT [User_role_df] DEFAULT 'user',
    CONSTRAINT [PK__User__3213E83F7E70EC3E] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Task] ADD CONSTRAINT [FK__Task__userId__6C190EBB] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
