#include<stdio.h>
#include<stdlib.h>
#include<fcntl.h>
#include<unistd.h>

int main()
{
    int fd = 0;
    char buffer[256];
    size_t byteRead;

    fd = open("./hello.txt", O_RDONLY);

    if(fd < 0)
    {
        printf("Unable to open the file\n");
        return -1;
    }

    printf("File opened successfully with fd: %d\n", fd);

    while((byteRead = read(fd, buffer, sizeof(buffer) - 1)) > 0)
    {
        buffer[byteRead] = '\0';
        printf("%s\n", buffer);
    }

    if(byteRead == -1)
    {
        printf("ERROR: Unale to read data or File is empty");
        return -1;
    }

    // printf("Data within file is: \n", read(fd, buffer, sizeof(buffer)));
    close(fd);

    return 0;
}