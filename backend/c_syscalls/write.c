#include<stdio.h>
#include<stdlib.h>
#include<fcntl.h>
#include<unistd.h>
#include<string.h>

int main()
{
    int fd = 0;
    ssize_t bytesWritten;
    char buffer[] = "Hello! This text was written using a file descriptor.\n";

    fd = open("./Demo.txt", O_CREAT | O_RDWR, 0777);

    if(fd < 0)
    {
        printf("Unable to write into file\n");
        return -1;
    }

    printf("File Opened Successfully with fd: %d\n", fd);

    bytesWritten = write(fd, buffer, strlen(buffer));

    if (bytesWritten == -1) 
    {
        printf("ERROR: Unable to write data to the file\n");
        close(fd);
        return -1;
    }

    printf("Success! Wrote %zd bytes to the file.\n", bytesWritten);

    close(fd);
    
    return 0;
}